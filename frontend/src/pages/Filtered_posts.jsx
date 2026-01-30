import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FilteredPosts = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Step 1: auth check
    fetch("http://localhost:5000/auth/check", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          navigate("/");
          return;
        }
        setAuthenticated(true);

        // Step 2: fetch filtered posts
        return fetch("http://localhost:5000/api/posts/filtered", {
          credentials: "include",
        });
      })
      .then((res) => res && res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch(() => {
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div style={styles.center}>
        <p style={styles.text}>Filtering posts…</p>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div style={styles.page}>
      <button
        style={styles.backButton}
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      <h1 style={styles.title}>Filtered Posts</h1>
      <p style={styles.subtitle}>
        Posts ranked by relevance to hiring & opportunities.
      </p>

      <div style={styles.content}>
        {posts.length === 0 ? (
          <p style={styles.placeholder}>No relevant posts found.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={styles.postCard}>
              <p style={styles.postText}>{post.text}</p>

              <div style={styles.meta}>
                <span>Score: {post.score}</span>
                <span>Author: {post.author_id ?? "unknown"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "#0b0b0b",
    color: "#fff",
    padding: "40px",
    fontFamily: "Inter, system-ui, sans-serif",
    boxSizing: "border-box",
    overflowX: "hidden",
  },
  backButton: {
    marginBottom: "20px",
    padding: "8px 16px",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    marginTop: "20px",
  },
  subtitle: {
    color: "#aaa",
    marginTop: "8px",
    fontSize: "14px",
    marginBottom: "30px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  postCard: {
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "16px",
  },
  postText: {
    fontSize: "15px",
    lineHeight: "1.6",
    marginBottom: "12px",
  },
  meta: {
    display: "flex",
    gap: "16px",
    fontSize: "13px",
    color: "#aaa",
  },
  center: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0b0b0b",
  },
  text: {
    color: "#aaa",
  },
  placeholder: {
    color: "#666",
    fontSize: "16px",
  },
};

export default FilteredPosts;
