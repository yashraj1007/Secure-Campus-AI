/**
 * Secure Campus AI - Authentication Module
 */

const Auth = {
    STORAGE_KEY: "scai_session",

    // ===========================
    // LOGIN API
    // ===========================

    async login(email, password, role) {

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        role
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                const session = {
                    ...data.user,
                    loginTime: new Date().toISOString()
                };

                localStorage.setItem(
                    this.STORAGE_KEY,
                    JSON.stringify(session)
                );

                return {
                    success: true,
                    session
                };
            }

            return {
                success: false,
                message: data.message
            };

        } catch (err) {

            return {
                success: false,
                message: "Cannot connect to backend."
            };

        }

    },

    // ===========================
    // PATHS
    // ===========================

    isInSubfolder() {
        const href = decodeURIComponent(window.location.href);

        return (
            /[/\\]student[/\\]/i.test(href) ||
            /[/\\]admin[/\\]/i.test(href)
        );
    },

    getLoginPath() {
        return this.isInSubfolder()
            ? "../login.html"
            : "login.html";
    },

    getDashboardPath(role) {

        const base = this.isInSubfolder()
            ? "../"
            : "";

        return role === "admin"
            ? base + "admin/soc-overview.html"
            : base + "student/dashboard.html";

    },

    logout() {

        localStorage.removeItem(this.STORAGE_KEY);

        window.location.href = this.getLoginPath();

    },

    // ===========================
    // SESSION
    // ===========================

    getSession() {

        try {

            const data = localStorage.getItem(this.STORAGE_KEY);

            return data ? JSON.parse(data) : null;

        } catch {

            return null;

        }

    },

    requireAuth(requiredRole) {

        const session = this.getSession();

        if (!session) {

            window.location.href = this.getLoginPath();

            return null;

        }

        if (requiredRole && session.role !== requiredRole) {

            window.location.href = this.getDashboardPath(session.role);

            return null;

        }

        return session;

    },

    // ===========================
    // LOGIN FORMS
    // ===========================

    initLoginForms() {

        const studentForm = document.getElementById("student-login-form");
        const adminForm = document.getElementById("admin-login-form");

        if (studentForm) {

            studentForm.addEventListener("submit", async (e) => {

                e.preventDefault();

                const email = document
                    .getElementById("student-email")
                    .value
                    .trim();

                const password = document
                    .getElementById("student-password")
                    .value;

                const result = await this.login(
                    email,
                    password,
                    "student"
                );

                this.handleLoginResult(
                    result,
                    "student-error",
                    "student/dashboard.html"
                );

            });

        }

        if (adminForm) {

            adminForm.addEventListener("submit", async (e) => {

                e.preventDefault();

                const email = document
                    .getElementById("admin-email")
                    .value
                    .trim();

                const password = document
                    .getElementById("admin-password")
                    .value;

                const result = await this.login(
                    email,
                    password,
                    "admin"
                );

                this.handleLoginResult(
                    result,
                    "admin-error",
                    "admin/soc-overview.html"
                );

            });

        }

        this.initRoleSelection();

    },

    // ===========================
    // ROLE SELECTOR
    // ===========================

    initRoleSelection() {

        const roleSelector = document.getElementById("role-selector");
        const loginView = document.getElementById("login-view");

        if (!roleSelector || !loginView) return;

        document.querySelectorAll("[data-select-role]").forEach(btn => {

            btn.addEventListener("click", () => {

                this.showLogin(btn.dataset.selectRole);

            });

        });

        document
            .getElementById("back-to-roles")
            ?.addEventListener("click", () => {

                this.showRoleSelector();

            });

        const hash = window.location.hash.replace("#", "");

        if (hash === "student" || hash === "admin") {

            this.showLogin(hash);

        }

    },

    showLogin(role) {

        document.getElementById("role-selector").hidden = true;
        document.getElementById("login-view").hidden = false;

        document.getElementById("student-login-panel").hidden =
            role !== "student";

        document.getElementById("admin-login-panel").hidden =
            role !== "admin";

        const demoHint = document.getElementById("demo-hint");

        demoHint.textContent =
            role === "student"
                ? "Demo: student@campus.com / student123"
                : "Demo: admin@campus.com / admin123";

        window.location.hash = role;

        document
            .getElementById(
                role === "student"
                    ? "student-email"
                    : "admin-email"
            )
            ?.focus();

        if (typeof lucide !== "undefined")
            lucide.createIcons();

    },

    showRoleSelector() {

        document.getElementById("role-selector").hidden = false;
        document.getElementById("login-view").hidden = true;

        history.replaceState(
            null,
            "",
            window.location.pathname
        );

    },

    // ===========================
    // LOGIN RESULT
    // ===========================

    handleLoginResult(result, errorId, redirectUrl) {

        const errorEl = document.getElementById(errorId);

        if (result.success) {

            errorEl?.classList.remove("visible");

            window.location.href = redirectUrl;

            return;

        }

        if (errorEl) {

            errorEl.textContent = result.message;

            errorEl.classList.add("visible");

        }

    },

    // ===========================
    // DASHBOARD USER INFO
    // ===========================

    populateUserInfo(session) {

        const initials = session.name
            .split(" ")
            .map(n => n[0])
            .join("");

        document
            .querySelectorAll("[data-user-name]")
            .forEach(el => el.textContent = session.name);

        document
            .querySelectorAll("[data-user-role]")
            .forEach(el =>
                el.textContent =
                    session.role === "admin"
                        ? "SOC Analyst"
                        : "Student"
            );

        document
            .querySelectorAll("[data-user-id]")
            .forEach(el => el.textContent = session.id);

        document
            .querySelectorAll("[data-user-avatar]")
            .forEach(el => el.textContent = initials);

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Auth.initLoginForms();

});