from flask import Blueprint, request, jsonify
from ai.gemini_service import ask_gemini, analyze_email

ai_bp = Blueprint("ai", __name__)


# ==========================================
# AI TEST
# ==========================================
@ai_bp.route("/api/ai/test", methods=["POST"])
def test_ai():

    data = request.get_json()

    prompt = data.get("prompt")

    if not prompt:
        return jsonify({
            "success": False,
            "message": "Prompt required"
        }), 400

    result = ask_gemini(prompt)

    return jsonify(result)


# ==========================================
# AI CHAT ASSISTANT
# ==========================================
@ai_bp.route("/api/ai/chat", methods=["POST"])
def ai_chat():

    data = request.get_json()

    question = data.get("question")

    if not question:
        return jsonify({
            "success": False,
            "message": "Question required"
        }), 400

    prompt = f"""
You are Secure Campus AI.

You help college students stay safe online.

Answer in simple language.

Keep answers under 200 words.

Question:

{question}
"""

    result = ask_gemini(prompt)

    return jsonify(result)


# ==========================================
# EMAIL PHISHING ANALYZER
# ==========================================
@ai_bp.route("/api/ai/analyze", methods=["POST"])
def email_analyzer():

    data = request.get_json()

    email_text = data.get("text")

    if not email_text:
        return jsonify({
            "success": False,
            "message": "Email text is required."
        }), 400

    try:

        result = analyze_email(email_text)

        return jsonify({
            "success": True,
            "result": result
        })

    except Exception as e:

        print("EMAIL ANALYZER ERROR:", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500