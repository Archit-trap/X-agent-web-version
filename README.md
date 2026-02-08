<!-- Improved compatibility of back to top link -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/Archit-vibes/X-agent-web-version">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">X Lead Qualification & Auto-Reply Agent</h3>

  <p align="center">
    An agentic system that authenticates with X (Twitter), tracks posts and mentions, filters high-intent leads, generates AI-powered replies, and auto-posts them through a unified dashboard.
    <br />
    <br />
    <a href="https://github.com/Archit-vibes/X-agent-web-version">View Demo</a>
    &middot;
    <a href="https://github.com/Archit-vibes/X-agent-web-version/issues">Report Bug</a>
    &middot;
    <a href="https://github.com/Archit-vibes/X-agent-web-version/issues">Request Feature</a>
  </p>
</div>

---

## Table of Contents
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

## About The Project

This project is an **end-to-end automation agent for X (Twitter)** focused on lead qualification and engagement.

It authenticates users via OAuth 2.0 (PKCE), fetches posts and mentions, filters relevant content using NLP-based scoring, generates context-aware AI replies, and posts them automatically through the X API.

### Key Features
- Secure OAuth 2.0 authentication with X
- Fetching recent posts and mentions
- Relevance filtering using TF-IDF + keyword heuristics
- Theme-aware reply generation using LLMs
- Automated reply posting
- React-based dashboard for visibility and control

The system is modular and designed to be extended with token refresh, background workers, and persistent storage.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### Built With

**Backend**
- Python
- Flask
- SQLAlchemy
- SQLite (development)

**Frontend**
- React (Vite)
- React Router

**AI / ML**
- LangChain
- Google Gemini
- Scikit-learn (TF-IDF, cosine similarity)

**APIs**
- X (Twitter) API v2

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started

Follow the steps below to run the project locally.

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm
- X Developer Account with OAuth 2.0 enabled

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Archit-vibes/X-agent-web-version.git
   cd X-agent-web-version
