from flask import Blueprint, jsonify
from services.x_posts import fetch_recent_posts
from backend.db import SessionLocal
from backend.models import Post
from sqlalchemy.exc import IntegrityError

posts_bp = Blueprint("posts", __name__, url_prefix="/api/posts")

@posts_bp.route("/recent")
def recent_posts():
    posts = fetch_recent_posts()

    db = SessionLocal()
    
    try:
        for post_dict in posts:
            post = Post(
                id=int(post_dict['id']),
                text=post_dict['text'],
                author_id=int(post_dict['author_id'])
            )

            db.add(post)
            print(f"Saved post ID {post.id} to database.")

        db.commit()

    except IntegrityError:
            db.rollback()
            print(f"Post ID {post.id} already exists in the database. Skipping.******************************************************")

    except Exception as e:
            db.rollback()
            print(f"Error occurred: {e}--------------------------------------------")

    finally:

        db.close()

    return jsonify(posts)
