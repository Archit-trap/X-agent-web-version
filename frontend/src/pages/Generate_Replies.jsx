import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GenerateReplies = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/auth/check", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAuthenticated(true);
        } else {
          navigate("/");
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
      <h1 style={styles.title}>Generate Replies</h1>
      <p style={styles.subtitle}>
        Generate AI-powered replies for posts using our intelligent system.
      </p>

      <div style={styles.content}>
        <p style={styles.placeholder}>Reply generator will appear here...</p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    background: "#0b0b0b",
    color: "#fff",
    padding: "40px",
    fontFamily: "Inter, system-ui, sans-serif",
    boxSizing: "border-box",
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
  title: {
    fontSize: "28px",
    fontWeight: "600",
    marginTop: "20px",
  },
  subtitle: {
    color: "#aaa",
    marginTop: "8px",
    fontSize: "14px",
  },
  content: {
    marginTop: "40px",
    padding: "24px",
    background: "#1a1a1a",
    borderRadius: "8px",
    minHeight: "300px",
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

export default GenerateReplies;
