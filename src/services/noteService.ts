import axios from "axios";
import type { NewNoteData, Note } from "../types/note";

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

export const createNote = async (noteData: NewNoteData) => {
  const response = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes?`,
    noteData,
    {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data;
};

export const deleteNote = async (noteId: number) => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data;
};
