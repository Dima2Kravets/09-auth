import axios, { AxiosError } from 'axios';
export type ApiError = AxiosError<{ error: string }>;

const baseURL = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api`;
console.log("NEXT_PUBLIC_NEXTAUTH_URL:", process.env.NEXT_PUBLIC_NEXTAUTH_URL);
console.log("baseURL:", baseURL);

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});