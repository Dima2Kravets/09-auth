import { nextServer } from "./api";
import type { User, RegisterRequest } from "@/types/user";
import type { Note, NewNoteData } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  }


export const register = async (data: RegisterRequest): Promise<User | null> => {
  try {
    const response = await nextServer.post<User>('/auth/register', data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};


export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export type UpdateUserRequest = {
  username?: string;
  email?: string;
  avatar?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};

export const fetchNotes = async (
  page: number,
  searchTerm: string,
  perPage: number = 12,
  sortBy: "created" | "updated" | "title" = "created",
  tag?:string
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>(
    `/notes`, {
      params: {
      page,
      perPage,
      sortBy,
      search: searchTerm,
      tag
      },
    }, 
  );
  return response.data;
};

export const fetchNoteById = async (id: string) => {
    const respons = await nextServer.get<Note>(`/notes/${id}`);
  return respons.data;
};

export const createNote = async (noteData: NewNoteData):Promise<Note> => {
    const res = await nextServer.post<Note>("/notes", noteData);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
};