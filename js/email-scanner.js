/**
 * Secure Campus AI
 * Email Phishing Scanner (Gemini AI)
 */

const EmailScanner = {

    async scan() {

        const input = document.getElementById("email-content");
        const text = input.value.trim();

        if (!text) {
            alert("Please paste an email first.");
            return;
        }

        const btn = document.getElementById("scan-btn");
        const results = document.getElementById("scan-results-content");
        const empty = document.getElementById("scan-empty");

        btn.disabled = true;
        btn.innerHTML = "Analyzing...";

        empty.style.display = "none";

        results.innerHTML = `
            <div style="padding:20px;text-align:center">
                <h3>🤖 Secure Campus AI is Analyzing the mail</h3>
            </div>
        `;

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/ai/analyze",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        text:text
                    })
                }
            );

            const data = await response.json();

            btn.disabled = false;
            btn.innerHTML = "🔍 Analyze Email";

            if(!data.success){

                results.innerHTML = `
                    <div class="panel">
                        <h3 style="color:red;">❌ Error</h3>
                        <p>${data.message}</p>
                    </div>
                `;

                return;
            }

            const result = data.result;

            let color = "#22c55e";

            if(result.risk_score >= 70)
                color = "#ef4444";
            else if(result.risk_score >=40)
                color = "#f59e0b";

            results.innerHTML = `

                <div class="panel">

                    <h2>📧 AI Analysis Result</h2>

                    <br>

                    <h3>
                        Risk Score :
                        <span style="color:${color}">
                            ${result.risk_score}/100
                        </span>
                    </h3>

                    <h3>
                        Threat Level :
                        <span style="color:${color}">
                            ${result.threat}
                        </span>
                    </h3>

                    <br>

                    <h3>Analysis</h3>

                    <p>
                        ${result.analysis}
                    </p>

                    <br>

                    <h3>Recommendations</h3>

                    <ul>

                        ${result.tips.map(tip=>`
                            <li>${tip}</li>
                        `).join("")}

                    </ul>

                </div>

            `;

        }

       catch(error){

    console.error(error);

    btn.disabled = false;
    btn.innerHTML = "🔍 Analyze Email";

    results.innerHTML = `
        <div class="panel">
            <h3 style="color:red;">Error</h3>
            <p>${error.message}</p>
        </div>
    `;

}

    },

    loadSample(type){

        const samples = {

            safe:
`From: registrar@university.edu

Subject: Course Registration

Dear Student,

Your course registration has been completed successfully.

Thank you.`,

            phishing:
`From: security@campus-login.xyz

Subject: URGENT VERIFY ACCOUNT

Dear User,

Your account will be suspended.

Click immediately:

http://secure-login.com

Attachment:
account.exe`

        };

        document.getElementById("email-content").value =
            samples[type];

    }

};


document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('scan-btn')?.addEventListener('click', () => EmailScanner.scan());

    document.getElementById('sample-safe')?.addEventListener('click', () => EmailScanner.loadSample('safe'));

    document.getElementById('sample-phishing')?.addEventListener('click', () => EmailScanner.loadSample('phishing'));

    // Upload button
    document.getElementById('upload-email')?.addEventListener('click', () => {
        document.getElementById('email-file').click();
    });

    // Read uploaded file
    document.getElementById('email-file')?.addEventListener('change', (event) => {

        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function(e) {

            document.getElementById("email-content").value = e.target.result;

        };

        reader.readAsText(file);

    });

});
