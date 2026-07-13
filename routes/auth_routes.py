print("✅ auth_routes.py loaded")
from flask import Blueprint, request, jsonify
from services.auth_service import login_user

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/api/auth/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if not email or not password or not role:
        return jsonify({
            "success": False,
            "message": "Missing required fields"
        }), 400

    user = login_user(email, password, role)

    if user:
        return jsonify({
            "success": True,
            "message": "Login Successful",
            "user": user
        })

    return jsonify({
        "success": False,
        "message": "Invalid Email or Password"
    }), 401