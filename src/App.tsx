import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import NewBlog from "./pages/NewBlog";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/blogs" />} />
      <Route path="/blogs" element={<Home />} />
      <Route path="/blogs/:id" element={<BlogPage />} />
      <Route path="/new-blog" element={<NewBlog />} />
    </Routes>
  );
}
