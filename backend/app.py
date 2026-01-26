import sys
import os

# Add parent directory to path so we can import sibling modules
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask
from flask_session import Session
from flask_cors import CORS   # ✅ ADD THIS
from auth.routes import auth_bp

app = Flask(__name__)
app.secret_key = "dev-secret"

app.config.update(
    SESSION_TYPE="filesystem",
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
)


# ✅ ADD THIS BLOCK (nothing else changes)
CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:5173"]
)

Session(app)
app.register_blueprint(auth_bp, url_prefix="/auth")

if __name__ == "__main__":
    app.run(debug=True)
