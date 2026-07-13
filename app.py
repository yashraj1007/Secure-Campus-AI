from flask import Flask
from flask_cors import CORS

from config import Config
from database.schema import create_tables
from routes.auth_routes import auth_bp
from routes.ai_routes import ai_bp
from routes.game_routes import game_bp

print("🚀 Secure Campus AI Backend Starting...")

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

# Create database tables
create_tables()

# Register routes
app.register_blueprint(auth_bp)
app.register_blueprint(ai_bp)
app.register_blueprint(game_bp)

@app.route("/")
def home():
    return {
        "success": True,
        "message": "Secure Campus AI Backend Running"
    }
print("\n===== REGISTERED ROUTES =====")
for rule in app.url_map.iter_rules():
    print(rule)
print("=============================\n")

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=8000,
        debug=True
    )