import axios from "axios";
import type { Note } from "../types/note";

const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (page: number): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(
    `https://notehub-public.goit.study/api/notes?`,
    {
      params: {
        page,
        perPage: 12,
      },
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    }
  );

  console.log(response.data);
  return response.data;
};
