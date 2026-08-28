import axios from "axios";
import { SearchResults } from "../types/search";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const searchApi = {
  search: async (query: string): Promise<SearchResults> => {
    const { data } = await axios.get(`${API_URL}/search`, {
      params: { q: query },
      withCredentials: true,
    });
    return data;
  },
};
