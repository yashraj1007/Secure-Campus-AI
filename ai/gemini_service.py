from google import genai
from config import Config
import json

# ==========================================
# Gemini Client
# ==========================================
client = genai.Client(api_key=Config.GEMINI_API_KEY)

# Models to try (fallback if one is unavailable)
MODELS = [
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-2.0-flash"
]


# ==========================================
# GENERATE USING AVAILABLE MODEL
# ==========================================
def generate(prompt):

    last_error = None

    for model in MODELS:

        try:

            print(f"\nTrying model: {model}")

            response = client.models.generate_content(
                model=model,
                contents=prompt
            )

            print(f"Success using {model}")

            return response.text

        except Exception as e:

            print(f"{model} failed -> {e}")

            last_error = e

    raise Exception(last_error)


# ==========================================
# EMAIL ANALYSIS
# ==========================================
def analyze_email(email_text):

    prompt = f"""
You are a cybersecurity expert.

Analyze the following email.

Return ONLY valid JSON.

Example:

{{
    "risk_score":85,
    "threat":"High",
    "analysis":"Explain why.",
    "tips":[
        "Tip 1",
        "Tip 2",
        "Tip 3"
    ]
}}

Email:

{email_text}
"""

    try:

        text = generate(prompt).strip()

        print("\n========== GEMINI EMAIL RESPONSE ==========")
        print(text)
        print("===========================================\n")

        if text.startswith("```"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        return json.loads(text)

    except json.JSONDecodeError:

        return {
            "risk_score": 0,
            "threat": "Unknown",
            "analysis": "Gemini returned invalid JSON.",
            "tips": []
        }

    except Exception as e:

        return {
            "risk_score": 0,
            "threat": "Unknown",
            "analysis": str(e),
            "tips": []
        }


# ==========================================
# GENERAL CHAT
# ==========================================
def ask_gemini(prompt):

    try:

        text = generate(prompt)

        print("\n========== GEMINI CHAT RESPONSE ==========")
        print(text)
        print("==========================================\n")

        return {
            "success": True,
            "response": text
        }

    except Exception as e:

        print("Gemini Error:", e)

        return {
            "success": False,
            "response": str(e)
        }