import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/login";
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Sign in to continue</h1>
        <p style={styles.subtitle}>
          Connect your X account to enable automated lead tracking and replies.
        </p>

        <button onClick={handleLogin} style={styles.button}>
          <span style={styles.xIcon}>𝕏</span>
          Continue with X
        </button>

        <p style={styles.footer}>We never post without permission.</p>
      </div>
    </div>
  );
};


const styles = {
  wrapper: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  card: {
    background: "#0b0b0b",
    padding: "40px",
    borderRadius: "14px",
    width: "360px",
    color: "#fff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    textAlign: "center",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#aaa",
    marginBottom: "28px",
  },
  button: {
    width: "100%",
    padding: "12px 16px",
    background: "#ffffff",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  xIcon: {
    fontSize: "18px",
    fontWeight: "700",
  },
  footer: {
    marginTop: "18px",
    fontSize: "12px",
    color: "#777",
  },
};

export default Login;
