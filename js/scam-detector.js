/**
 * Secure Campus AI
 * Placement Scam Detector (AI Powered)
 */

const ScamDetector = {

    async detect() {

        const company = document.getElementById("scam-company").value.trim();
        const offer = document.getElementById("scam-offer").value.trim();
        const email = document.getElementById("scam-email").value.trim();

        if (!company && !offer && !email) {
            alert("Please enter the placement details.");
            return;
        }

        const btn = document.getElementById("scam-detect-btn");

        btn.disabled = true;

        document.getElementById("scam-results").innerHTML = `
        <div class="loading-card">
            <div class="spinner"></div>

            <h2>🛡️ Secure Campus AI</h2>

            <p><strong>Analyzing Placement Offer...</strong></p>

            <p style="color:#888;font-size:14px;">
                Verifying company details...<br>
                Detecting scam indicators...<br>
                Checking suspicious wording...<br>
                Generating AI security assessment...
            </p>
        </div>
        `;

        const prompt = `
You are a Cybersecurity Placement Scam Detection AI.

Analyze the following placement offer.

Company:
${company}

Job Description:
${offer}

Email / Message:
${email}

Return your answer exactly in this format:

Risk Score: XX%

Verdict:
Safe / Suspicious / Scam

Reasons:
- point
- point
- point

Student Advice:
- point
- point
`;

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/ai/test",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        prompt: prompt
                    })
                }
            );

            const data = await response.json();

            document.getElementById("scam-results").innerHTML = `
                <div class="panel">

                    <div class="panel__header">
                        <span class="panel__title">
                        🤖 AI Scam Detection Report
                        </span>
                    </div>

                    <div class="panel__body">

                        <pre style="
                        white-space:pre-wrap;
                        font-size:15px;
                        line-height:1.7;
                        font-family:inherit;
                        ">
${data.response}
                        </pre>

                    </div>

                </div>
            `;

        }
        catch(error){

            document.getElementById("scam-results").innerHTML=`
            <div class="panel">
                <div class="panel__body">

                    ❌ Unable to connect to AI Backend.

                </div>
            </div>
            `;
        }

        btn.disabled=false;

    },

    loadSample(){

        document.getElementById("scam-company").value =
        "TechGlobal Solutions";

        document.getElementById("scam-offer").value =
`Congratulations!

You have been selected immediately.

Salary: ₹18 LPA

No interview required.

Pay ₹2500 registration fee today.

Limited seats only.

Work From Home.`;

        document.getElementById("scam-email").value =
`Dear Candidate,

Pay your registration fee immediately.

Send Aadhaar Card and PAN Card.

Contact HR only on WhatsApp.

Offer expires today.`;

    }

};


document.addEventListener("DOMContentLoaded",()=>{

    document
    .getElementById("scam-detect-btn")
    ?.addEventListener("click",()=>{

        ScamDetector.detect();

    });

    document
    .getElementById("scam-sample")
    ?.addEventListener("click",()=>{

        ScamDetector.loadSample();

    });

});