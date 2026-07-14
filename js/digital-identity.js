const API_URL = "http://127.0.0.1:8000/api/identity/analyze";

async function checkPassword() {

    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
        alert("Passwords do not match.");
        return;
    }

    analyzeIdentity();
}

async function checkPrivacy() {
    analyzeIdentity();
}

async function analyzeIdentity() {

    const password = document.getElementById("password").value;

    const data = {

        password: password,

        instagram: document.getElementById("instagram").checked,

        linkedin: document.getElementById("linkedin").checked,

        github: document.getElementById("github").checked,

        same_password: document.getElementById("same").checked,

        mfa: document.getElementById("mfa").checked

    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (!result.success) {
            alert("Analysis failed.");
            return;
        }

        updateUI(result.result);

    } catch (err) {

        console.error(err);

        alert("Cannot connect to backend.");

    }

}

function updateUI(result) {

    document.getElementById("strengthBar").style.width =
        result.password_strength + "%";

    document.getElementById("privacyBar").style.width =
        result.privacy_score + "%";

    document.getElementById("strengthText").innerHTML =
        result.password_strength + "% (" + result.security_level + ")";

    document.getElementById("privacyText").innerHTML =
        result.privacy_score + "%";

    const tips = document.getElementById("tips");

    tips.innerHTML = "";

    result.tips.forEach(tip => {

        const li = document.createElement("li");

        li.innerText = tip;

        tips.appendChild(li);

    });

}