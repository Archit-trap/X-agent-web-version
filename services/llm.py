from backend.db import SessionLocal
from backend.models import Reply , Mention , FilteredPost
from sqlalchemy.exc import IntegrityError

from langchain_google_genai import GoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel , RunnableLambda , RunnablePassthrough

from services.prompt_temp import prompt_theme , prompt_reply , theme_parser

from dotenv import load_dotenv
load_dotenv()


final_parser = StrOutputParser()

llm_reply = GoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.7)
llm_classify = GoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.0)



chain_theme = RunnableParallel({
        "theme": prompt_theme | llm_classify | theme_parser | RunnableLambda(lambda x: x.theme),
        "post_text": RunnableLambda(lambda x: x["post_text"]) })

chain_reply = prompt_reply | llm_reply | final_parser

final_chain = chain_theme | chain_reply

def generate_replies_for_filtered_posts():
    db = SessionLocal()
    # generated_replies = []
    
    # try:
    #     filtered_posts = db.query(FilteredPost).all()
        
    #     for post in filtered_posts:
    #         try:
    #             # Check if reply already exists to avoid re-generation expense (optional optimization)
    #             existing_reply = db.query(Reply).filter(Reply.id == post.id).first()
    #             if existing_reply:
    #                 continue

    #             result = final_chain.invoke({"post_text": post.text})

    #             reply = Reply(
    #                 target_tweet_id=str(post.id),
    #                 post_text=post.text,
    #                 reply_text=result,
    #                 status="generated"
    #             )


    #             db.add(reply)
    #             db.commit()
    #             print(f"Saved reply for post ID {post.id} to database.")
                
    #             generated_replies.append({
    #                 "id": reply.id,
    #                 "post_text": reply.post_text,
    #                 "reply_text": reply.reply_text
    #             })

    #         except IntegrityError:
    #             db.rollback()
    #             print(f"Reply for post ID {post.id} already exists in the database. Skipping.")
            
    #         except Exception as e:
    #             db.rollback()
    #             print(f"Error saving reply for post ID {post.id}: {e}")
                
    # except Exception as e:
    #     print(f"Error checking filtered posts: {e}")
    # finally:
    #     db.close()

    reply = Reply(
                    target_tweet_id=str(2014778229664711050),
                    post_text='''
                    
                        TL;DR:

                        You never know who you’re really talking to.

                        I was combing through some old LinkedIn messages to reach out to folks to demo Ghost Testing.

                        There was this guy I interviewed with for a job a startup he was hiring for years ago. (I didn’t get it)

                        I DM’d him to see i''',


                    reply_text="hello",
                    status="generated"
                )
    
    db.add(reply)
    db.commit()
    db.close()       
    return 