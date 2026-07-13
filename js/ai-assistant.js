const AIAssistant = {

    addMessage(message, sender) {

        const chat = document.getElementById("chat-messages");

        const div = document.createElement("div");

        div.className =
            sender === "user"
            ? "chat-message chat-message--user"
            : "chat-message chat-message--ai";

        div.innerHTML = `
            <div class="chat-message__avatar">
                ${sender === "user" ? "👤" : "🤖"}
            </div>

            <div class="chat-message__bubble">
                ${message.replace(/\n/g,"<br>")}
            </div>
        `;

        chat.appendChild(div);

        chat.scrollTop = chat.scrollHeight;

    },


    async sendMessage(text){

        if(text.trim()==="") return;

        this.addMessage(text,"user");

        document.getElementById("chat-input").value="";

        const chat=document.getElementById("chat-messages");

        const loading=document.createElement("div");

        loading.id="loading-ai";

        loading.className="chat-message chat-message--ai";

        loading.innerHTML=`

        <div class="chat-message__avatar">

            🤖

        </div>

        <div class="chat-message__bubble">

            <strong>🛡️ Secure Campus AI is thinking...</strong>

        </div>

        `;

        chat.appendChild(loading);

        chat.scrollTop=chat.scrollHeight;

        try{

            const response=await fetch(

                "http://127.0.0.1:8000/api/ai/chat",

                {

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify({
                        question:text
                    })

                }

            );

            const data=await response.json();

            loading.remove();

            if(data.success){

                this.addMessage(data.response,"ai");

            }

            else{

                this.addMessage(data.response,"ai");

            }

        }

        catch{

            loading.remove();

            this.addMessage(

                "Unable to connect with Secure Campus AI.",

                "ai"

            );

        }

    },



    init(){

        const input=document.getElementById("chat-input");

        document.getElementById("chat-send").onclick=()=>{

            this.sendMessage(input.value);

        };

        input.addEventListener("keypress",(e)=>{

            if(e.key==="Enter"){

                this.sendMessage(input.value);

            }

        });

        document.querySelectorAll(".chat-suggestion")

        .forEach(btn=>{

            btn.onclick=()=>{

                this.sendMessage(

                    btn.dataset.question

                );

            };

        });

        this.addMessage(

            "👋 Hello! I am Secure Campus AI. Ask me anything about cybersecurity, phishing, malware, passwords, scams, or online safety.",

            "ai"

        );

    }

};

document.addEventListener("DOMContentLoaded",()=>{

    AIAssistant.init();

});