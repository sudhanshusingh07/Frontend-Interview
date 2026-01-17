import { useState } from "react";
import BlogLists from "../components/BlogLists";
import BlogDetails from "../components/BlogDetails";
import Navbar from "../components/Navbar";

export default function BlogsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <div style={{ width: "30%" }}>
          <BlogLists onSelect={setSelectedId} selectedId={selectedId} />
        </div>

        <div style={{ width: "70%" }}>
          <BlogDetails blogId={selectedId} />
        </div>
      </div>
    </>
  );
}
