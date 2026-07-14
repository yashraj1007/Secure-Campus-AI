const OpportunityChecker = {

    async analyze(){

        const message =
            document.getElementById("opportunity-text").value;

        if(message.trim()===""){

            alert("Please paste an opportunity.");

            return;

        }

        const response =
        await fetch(

            "http://127.0.0.1:8000/api/opportunity/check",

            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    message

                })

            }

        );

        const data =
        await response.json();

        const result =
        data.result;

        document.getElementById(
            "opportunity-result"
        ).innerHTML=`

<h2>
Legitimacy Score :
${result.legitimacy_score}%
</h2>

<h3>
Risk :
${result.risk}
</h3>

<h3>
Recommendation :
${result.recommendation}
</h3>

<h3>
Red Flags
</h3>

<ul>

${result.red_flags.map(flag=>`

<li>${flag}</li>

`).join("")}

</ul>

`;

    }

};

document.addEventListener("DOMContentLoaded",()=>{

document.getElementById("check-btn")

.addEventListener(

"click",

()=>{

OpportunityChecker.analyze();

}

);

});