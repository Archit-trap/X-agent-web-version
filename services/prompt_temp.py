from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from typing import Literal

class ThemeSchema(BaseModel):
    theme: Literal["Interrogative", "Affirmative", "Negative", "Neutral", "Informational", "Comedic", "Sarcastic", "Complaining", "Frustrated", "Suggestive", "Opinionated", "Promotional", "Announcement", "Emotional", "Professional" , "Other"] = Field(description="The primary theme of the social media post")

theme_parser = PydanticOutputParser(pydantic_object=ThemeSchema)


prompt_theme = PromptTemplate(
    input_variables=["post_text"],
    partial_variables={"format_instructions": theme_parser.get_format_instructions()},
    template="""
                You are a text intent and sentiment classifier.

                Task:
                Classify the PRIMARY theme of the given social media post.

                Choose exactly ONE label from the list below.

                Allowed labels:
                - Interrogative        # asking a question
                - Affirmative          # positive statement or agreement
                - Negative             # negative statement without emotion
                - Neutral              # factual or bland statement
                - Informational        # sharing information or updates
                - Comedic              # humor, jokes, memes
                - Sarcastic            # irony or mockery
                - Complaining          # dissatisfaction or criticism
                - Frustrated           # emotional stress, anger, burnout
                - Suggestive           # giving advice or recommendations
                - Opinionated          # expressing a personal belief or stance
                - Promotional          # marketing, self-promotion, links , Hiring
                - Announcement         # declaring news or updates
                - Emotional            # strong feelings (happy, sad, excited)
                - Professional         # work-related, formal tone
                - Other                # does not clearly fit above

                Rules:
                - Ignore hashtags, emojis, mentions, and URLs unless they change meaning.
                - Focus on intent, not keywords alone.
                - If multiple themes apply, choose the strongest one.
                - Do NOT explain your reasoning.
                - Output MUST follow the format instructions exactly.

                {format_instructions}

                Post text:
                \"\"\"{post_text}\"\"\"
                """
)


prompt_reply = PromptTemplate(
    input_variables=["post_text", "theme"],
    template="""
                You are a social media reply assistant.

                Task:
                Generate a polite, natural reply to the given post.

                Inputs:
                - Post content
                - Post theme (classified intent)

                Requirements:
                - Reply in the SAME language as the post.
                - Match the post’s tone and slang level.
                - If casual or Gen Z slang → reply casually but respectfully.
                - If formal → reply formally.
                - Be polite, calm, and non-confrontational.
                - Do NOT sound robotic or corporate.
                - Do NOT repeat the post text.
                - Do NOT use emojis unless the post uses them.
                - Keep the reply concise (1–3 sentences).
                - Avoid assumptions or strong opinions unless clearly appropriate.

                Theme-aware behavior:
                - Interrogative → provide a helpful answer or ask a brief clarifying question.
                - Affirmative → acknowledge and reinforce the positive statement politely.
                - Negative → respond calmly and neutrally without escalating.
                - Neutral → give a brief, polite acknowledgment or light engagement.
                - Informational → acknowledge the information or add small relevant value.
                - Comedic → respond lightly and playfully while staying respectful.
                - Sarcastic → reply carefully and respectfully without adding sharp sarcasm.
                - Complaining → show understanding and empathy without arguing or dismissing.
                - Frustrated → acknowledge emotions and respond with calm, supportive language.
                - Suggestive → acknowledge the suggestion and respond thoughtfully or appreciatively.
                - Opinionated → respect the viewpoint without debating or opposing strongly.
                - Promotional → respond neutrally and courteously without amplifying marketing.
                - Announcement → acknowledge the update briefly and respectfully.
                - Emotional → match the emotional tone with empathy or positivity.
                - Professional → maintain a formal, respectful, and concise tone.
                - Other → use a safe, neutral, and polite response.


                Post content:
                \"\"\"{post_text}\"\"\"

                Post theme:
                {theme}

                """
)