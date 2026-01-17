import axios from "axios";
import { Blog } from "../types/blog";

const API_URL = "http://localhost:3001/blogs";

export const getBlogs = async (): Promise<Blog[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};
