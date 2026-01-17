import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Blog } from "../types/blog";

import { useParams } from "react-router-dom";

interface Props {
  onSelect: (id: number) => void;
}

export default function BlogList({ onSelect }: Props) {
  const { id } = useParams(); 
  const blogId = Number(id);

  const { data, isLoading, isError } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/blogs");
      return res.data.map((blog: any) => ({
        ...blog,
        id: Number(blog.id),
      }));
    },
  });

  if (isLoading) return <p>Loading blog...</p>;
  if (isError) return <p>Failed to load blog</p>;

  
  const blog = data?.find((b) => b.id === blogId);

  if (!blog) return <p>Blog not found</p>;

  return (
    <div
      onClick={() => onSelect(blog.id)}
      className="cursor-pointer rounded-lg border border-blue-500 bg-blue-50 p-4"
    >
      <h4 className="font-semibold">{blog.title}</h4>
      <p className="text-sm text-gray-600">{blog.description}</p>
    </div>
  );
}
