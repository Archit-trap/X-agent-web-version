import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Mentions from "./pages/Mentions";
import RecentPosts from "./pages/Recent_Posts";
import GenerateReplies from "./pages/Generate_Replies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mentions" element={<Mentions />} />
        <Route path="/recent-posts" element={<RecentPosts />} />
        <Route path="/generate-replies" element={<GenerateReplies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
