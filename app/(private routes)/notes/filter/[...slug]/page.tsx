import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NoteClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  const title = `Notes tagged with "${tag}"`;
  const description = `Explore all notes under the "${tag}" tag.`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg", 
          width: 1200,
          height: 630,
          alt: `Notes tagged with "${tag}"`,
        },
      ],
      url: `https://notehub.com/tags/${tag}`,
    },
  };
}

const App = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { page: pageParam, search: searchParam } = await searchParams;

  const tagParam = slug?.[0] || "";
  const tag = tagParam === "All" ? undefined : tagParam;
  const page = Number(pageParam) || 1;
  const search = searchParam || "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
  queryKey: ["notes", { page, search, tag }],
  queryFn: () => fetchNotes({ page, perPage: 12, search, tag }),
});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag}/>
    </HydrationBoundary>
  );
};

export default App;