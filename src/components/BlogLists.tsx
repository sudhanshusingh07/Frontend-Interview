import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { Blog } from "../types/blog";

interface Props {
  onSelect: (id: number) => void
  selectedId?: number | null
}

export default function BlogLists({ onSelect, selectedId }: Props) {
  const { data, isLoading, isError } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/blogs")
      return res.data.map((blog: any) => ({
        ...blog,
        id: Number(blog.id), 
      }))
    },
  })

  
  useEffect(() => {
    if (data?.length && !selectedId) {
      onSelect(data[0].id)
    }
  }, [data, selectedId, onSelect])

  if (isLoading) return <p>Loading blogs...</p>
  if (isError) return <p>Failed to load blogs</p>

  return (
    <div className="space-y-3">
      {data?.map((blog) => (
        <div
          key={blog.id}
          onClick={() => onSelect(blog.id)}
          className={`cursor-pointer rounded-lg border p-4 transition 
            ${
              selectedId === blog.id
                ? "bg-blue-50 border-blue-500"
                : "hover:bg-gray-50"
            }`}
        >
          
          <h4 className="font-semibold">{blog.title}</h4>
          <p className="text-sm text-gray-600">{blog.description}</p>
        </div>
      ))}
    </div>
  )
}
