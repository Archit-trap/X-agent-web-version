import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GenerateReplies = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [replies, setReplies] = useState([]);
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    fetch("http://localhost:5000/auth/check", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAuthenticated(true);
          fetchReplies(); // Fetch existing replies on load
        } else {
          navigate("/");
        }
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const fetchReplies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/replies/list");
      const data = await res.json();
      setReplies(data);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch("http://localhost:5000/api/replies/generate", {
        method: "POST",
      });
      const data = await res.json();
      if (data.replies) {
        fetchReplies();
      }
    } catch (error) {
      console.error("Error generating replies:", error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <p style={styles.text}>Loading replies generator…</p>
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
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Generate Replies</h1>
          <p style={styles.subtitle}>
            Generate AI-powered replies for your filtered posts.
          </p>
        </div>
        <button
          style={styles.generateButton}
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? "Generating..." : "Generate New Replies"}
        </button>
      </div>

      <div style={styles.content}>
        {replies.length === 0 ? (
          <p style={styles.placeholder}>No replies generated yet. Click "Generate" to start.</p>
        ) : (
          <div style={styles.grid}>
            {replies.map((reply) => (
              <div key={reply.id} style={styles.card}>
                <div style={styles.cardSection}>
                  <h3 style={styles.cardLabel}>Original Post:</h3>
                  <p style={styles.cardText}>{reply.post_text}</p>
                </div>
                <div style={styles.divider}></div>
                <div style={styles.cardSection}>
                  <h3 style={styles.cardLabel} className="highlight">AI Reply:</h3>
                  <p style={styles.cardText}>{reply.reply_text}</p>
                </div>
              </div>
            ))}
          </div>
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
    overflowX: "hidden"
  },
  backButton: {
    marginBottom: "20px",
    padding: "8px 16px",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "6px",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    margin: "0",
  },
  subtitle: {
    color: "#aaa",
    marginTop: "8px",
    fontSize: "14px",
    margin: "8px 0 0 0",
  },
  generateButton: {
    padding: "12px 24px",
    background: "#fff",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "16px",
    transition: "transform 0.1s",
  },
  content: {
    marginTop: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
  card: {
    background: "#1a1a1a",
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid #333",
  },
  cardSection: {
    marginBottom: "16px",
  },
  divider: {
    height: "1px",
    background: "#333",
    margin: "16px 0",
  },
  cardLabel: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#666",
    marginBottom: "8px",
    marginTop: "0",
  },
  cardText: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#e0e0e0",
    margin: "0",
    whiteSpace: "pre-wrap",
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
    textAlign: "center",
    marginTop: "60px",
  },
};

export default GenerateReplies;
