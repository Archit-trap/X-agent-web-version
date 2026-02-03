import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Posting = () => {
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchReplies();
    }, []);

    const fetchReplies = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/replies/list");
            if (response.ok) {
                const data = await response.json();
                setReplies(data);
            } else {
                console.error("Failed to fetch replies");
            }
        } catch (error) {
            console.error("Error fetching replies:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAutoPost = async () => {
        setPosting(true);
        try {
            const response = await fetch(
                "http://localhost:5000/api/posting/auto-post",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // 🔥 THIS FIXES IT
                }
            );

            if (response.ok) {
                alert("Auto-post triggered successfully!");
            } else {
                alert("Failed to trigger auto-post.");
            }
        } catch (error) {
            console.error("Error triggering auto-post:", error);
            alert("Error triggering auto-post.");
        } finally {
            setPosting(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Posting</h1>
                <button style={styles.backButton} onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </div>

            <div style={styles.controls}>
                <button
                    style={posting ? styles.postButtonDisabled : styles.postButton}
                    onClick={handleAutoPost}
                    disabled={posting}
                >
                    {posting ? "Posting..." : "Auto Post All Replies"}
                </button>
            </div>

            <div style={styles.content}>
                {loading ? (
                    <p style={styles.text}>Loading replies...</p>
                ) : replies.length === 0 ? (
                    <p style={styles.text}>No replies found.</p>
                ) : (
                    <div style={styles.list}>
                        {replies.map((reply) => (
                            <div key={reply.id} style={styles.card}>
                                <div style={styles.postSection}>
                                    <h3 style={styles.sectionTitle}>Original Post</h3>
                                    <p style={styles.postText}>{reply.post_text}</p>
                                </div>
                                <div style={styles.replySection}>
                                    <h3 style={styles.sectionTitle}>Generated Reply</h3>
                                    <p style={styles.replyText}>{reply.reply_text}</p>
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
        width: "99vw",
        background: "#0b0b0b",
        color: "#fff",
        padding: "40px",
        fontFamily: "Inter, system-ui, sans-serif",
        boxSizing: "border-box",
        overflowY: "hidden"
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
        margin: 0,
    },
    backButton: {
        background: "transparent",
        color: "#aaa",
        border: "1px solid #333",
        padding: "8px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    controls: {
        marginBottom: "30px",
        display: "flex",
        justifyContent: "flex-end", // Align button to the right? Or keeping it separate from header
    },
    postButton: {
        background: "#1d9bf0", // Twitter/X blue
        color: "#fff",
        border: "none",
        padding: "12px 24px",
        borderRadius: "24px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background 0.2s",
    },
    postButtonDisabled: {
        background: "#0f4e78",
        color: "#bbb",
        border: "none",
        padding: "12px 24px",
        borderRadius: "24px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "not-allowed",
    },
    content: {
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
    },
    text: {
        color: "#aaa",
        textAlign: "center",
        marginTop: "40px",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    card: {
        background: "#1a1a1a",
        border: "1px solid #333",
        borderRadius: "12px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    postSection: {
        borderBottom: "1px solid #333",
        paddingBottom: "15px",
    },
    replySection: {
        paddingTop: "5px",
    },
    sectionTitle: {
        fontSize: "14px",
        color: "#888",
        marginBottom: "8px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    },
    postText: {
        fontSize: "16px",
        lineHeight: "1.5",
        color: "#ddd",
        margin: 0,
    },
    replyText: {
        fontSize: "16px",
        lineHeight: "1.5",
        color: "#fff",
        margin: 0,
    },
};

export default Posting;
