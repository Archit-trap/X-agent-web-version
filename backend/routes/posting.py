from flask import Blueprint, jsonify, session
import time

from backend.db import SessionLocal
from backend.models import Reply
from auth.storage import user_tokens
from xdk import Client

posting_bp = Blueprint("posting", __name__, url_prefix="/api/posting")


# @posting_bp.route("/auto-post", methods=["POST"])
# def auto_post():
    
#     user_id = session.get("user_id")
#     token_data = user_tokens.get(user_id)

#     token = token_data["access_token"]

#     client = Client(bearer_token=token)

#     db = SessionLocal()

#     try:
#         replies = (
#             db.query(Reply)
#             .filter(Reply.status == "generated")
#             .limit(3)
#             .all()
#         )

#         if not replies:
#             return jsonify({"message": "No replies to post"}), 200

#         posted = []

#         for reply in replies:
#             try:
#                 result = client.posts.create(
#                     text=reply.reply_text,
#                     reply={"in_reply_to_tweet_id": str(reply.id)}
#                 )

#                 reply.status = "posted"
#                 db.commit()

#                 posted.append(reply.id)

#                 # 4️⃣ Human-like delay
#                 time.sleep(15)

#             except Exception as e:
#                 db.rollback()
#                 print(f"Failed to post reply {reply.id}: {e}")

#         return jsonify({
#             "posted_count": len(posted),
#             "posted_reply_ids": posted
#         })

#     except Exception as e:
#         db.rollback()
#         return jsonify({"error": str(e)}), 500

#     finally:
#         db.close()


@posting_bp.route("/auto-post", methods=["POST"])
def auto_post():

    print("SESSION IN AUTO_POST:", dict(session))
    print("TOKENS KEYS:", list(user_tokens.keys()))

    x_user_id = session.get("x_user_id")

    if not x_user_id:
        return jsonify({"error": "Not authenticated"}), 401

    token_data = user_tokens.get(x_user_id)

    if not token_data:
        return jsonify({"error": "Token not found"}), 401

    token = token_data["access_token"]


    client = Client(bearer_token=token_data["access_token"])
    db = SessionLocal()

    try:
        replies = (
            db.query(Reply)
            .filter(Reply.status == "approved")
            .limit(3)
            .all()
        )

        if not replies:
            return jsonify({"message": "No replies to post"}), 200

        posted = []

        for reply in replies:
            try:
                client.posts.create(
                    text=reply.reply_text,
                    reply={"in_reply_to_tweet_id": reply.target_tweet_id}
                )

                reply.status = "posted"
                db.commit()
                posted.append(reply.id)

                time.sleep(15 + int(time.time()) % 10)

            except Exception as e:
                db.rollback()
                reply.status = "failed"
                db.commit()
                print(f"Failed to post reply {reply.id}: {e}")

        return jsonify({
            "posted_count": len(posted),
            "posted_reply_ids": posted
        })

    finally:
        db.close()
