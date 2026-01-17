import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-between border-b bg-white px-6 py-3">
      <h1 className="text-xl font-bold">CA Monk Blog</h1>

      <button
        onClick={() => navigate("/new-blog")}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        New Blog
      </button>
    </nav>
  );
}
