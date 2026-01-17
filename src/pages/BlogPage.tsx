import { useParams, useNavigate } from "react-router-dom";
import BlogList from "../components/BlogList";
import BlogDetails from "../components/BlogDetails";
import { useState, useEffect } from "react";

export default function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  
  useEffect(() => {
    if (id) {
      setSelectedBlogId(Number(id));
    }
  }, [id]);

  
  const handleSelect = (blogId: number) => {
    setSelectedBlogId(blogId);
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      
      <div style={{ width: "30%" }}>
        <BlogList onSelect={handleSelect} />
      </div>

      
      <div style={{ width: "70%" }}>
        <BlogDetails blogId={selectedBlogId} />
      </div>
    </div>
  );
}
