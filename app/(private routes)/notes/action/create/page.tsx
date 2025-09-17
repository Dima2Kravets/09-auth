import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";
import css from "./CreateNote.module.css"

export const metadata: Metadata = {
  title: "Create Note",
  description: "Start writing a new note and keep your ideas organized in Note Hub.",
  openGraph: {
    type: "website",
    title: "Create a New Note – Note Hub",
    description: "Easily create and organize your notes with Note Hub. Start writing your new note now.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub - Create a new note",
      }
    ],
    url: `https://notehub.com/create`,
  }
};
export default function CreateNote() {
    return (
<main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <NoteForm/>
  </div>
</main>
     
)
}