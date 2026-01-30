from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

HARD = ["hiring", "internship", "job", "opening"]
SOFT = ["engineer", "developer", "frontend", "backend"]
NEG = ["spam", "crypto", "airdrop"]

QUERY = "hiring internship job opening engineer developer"


def keyword_filter(text: str) -> bool:
    text = text.lower()

    if any(n in text for n in NEG):
        return False

    if not any(h in text for h in HARD):
        return False

    return True


def build_vectorizer(corpus):
    vectorizer = TfidfVectorizer(
        ngram_range=(1, 2),
        stop_words="english",
        min_df=1,
    )
    vectorizer.fit(corpus)
    query_vec = vectorizer.transform([QUERY])
    return vectorizer, query_vec


def tfidf_score(text, vectorizer, query_vec):
    text_vec = vectorizer.transform([text])
    return cosine_similarity(query_vec, text_vec)[0][0]


def hybrid_score(text, vectorizer, query_vec, soft_boost=0.05):
    text_l = text.lower()

    if not keyword_filter(text_l):
        return 0.0

    base = tfidf_score(text_l, vectorizer, query_vec)
    boost = sum(1 for k in SOFT if k in text_l) * soft_boost

    return base + boost
