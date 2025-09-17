import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";
import { fetchNoteById } from "@/lib/api/serverApi";
type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>  {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const description =
    note.content.length > 150 ? note.content.slice(0, 147) + "..." : note.content;

  return {
    title: `Note: "${note.title}"`,
    description,
    openGraph: {
      type: "website",
      title: `Note: "${note.title}"`,
      description,
      images: [
        {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Screenshot of Note Hub app interface"
        },
      ],
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;