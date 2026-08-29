import api from "@/lib/axios";
import { SearchResults } from "../types/search";

export const searchApi = {
  search: async (query: string): Promise<SearchResults> => {
    const { data } = await api.get(`/search`, {
      params: { q: query },
    });
    return data;
  },
};
