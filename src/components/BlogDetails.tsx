import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Blog } from "../types/blog";


interface Props {
  blogId: number | null;
}

export default function BlogDetails({ blogId }: Props) {
  const { data, isLoading, error } = useQuery<Blog>({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/blogs/${blogId}`);
      return {
        ...res.data,
        id: Number(res.data.id),
      };
    },
    enabled: !!blogId,
  });

  if (!blogId)
    return (
      <p className="text-gray-500 text-center mt-20">
        Select a blog to view details
      </p>
    );
  if (isLoading)
    return <p className="text-gray-500 text-center mt-20">Loading...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-20">Error loading blog</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md space-y-6">
      
      <div
        className="overflow-hidden rounded-lg shadow-lg border"
        style={{ width: "100%", height: "300px" }}
      >
        <img
          src={data?.coverImage}
          alt={data?.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      
      <h2 className="text-3xl font-bold text-gray-800">{data?.title}</h2>

      
      <p className="text-sm text-gray-500 font-medium">
        📅 {new Date(data?.date).toLocaleDateString()}
      </p>

      
      <hr className="border-t border-gray-300" />

      
      <div className="flex flex-wrap gap-2">
        {data?.category.map((cat) => (
          <span
            key={cat}
            className="px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>

      
      <p className="text-gray-700 italic bg-gray-100 p-4 rounded-md">
        {data?.description}
      </p>

     
      <div className="text-gray-800 leading-relaxed whitespace-pre-line bg-white p-4 rounded-md shadow-sm">
        {data?.content}
      </div>
    </div>
  );
}
