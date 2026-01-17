import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateBlogForm() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // yyyy-mm-dd

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3001/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          content,
          category: category.split(",").map((c) => c.trim()), // comma separated
          coverImage:
            coverImage ||
            "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
          date: new Date(date).toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Failed to create blog");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setTitle("");
      setDescription("");
      setContent("");
      setCoverImage("");
      setCategory("");
      setDate(new Date().toISOString().slice(0, 10));
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
      className="space-y-3 p-4 border rounded shadow"
    >
      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Cover Image URL"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Categories (comma separated)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
        Add Blog
      </button>
    </form>
  );
}
