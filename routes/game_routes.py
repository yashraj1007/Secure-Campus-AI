from flask import Blueprint, request, jsonify
from ai.gemini_service import ask_gemini

game_bp = Blueprint("game", __name__)

@game_bp.route("/api/game/explain", methods=["POST"])
def explain():

    data = request.get_json()

    question = data["question"]
    answer = data["answer"]

    prompt = f"""
You are a cybersecurity trainer.

Question:
{question}

Student Answer:
{answer}

Explain in less than 80 words:

• why the answer is correct or incorrect
• teach one cybersecurity concept

Keep it beginner friendly.
"""

    result = ask_gemini(prompt)

    return jsonify(result)