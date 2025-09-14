"use client";
import css from "@/app/notes/filter/[...slug]/Notes.client.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from 'next/navigation';

type NoteClientProps = {
  tag?: string;
};

export default function NoteClient({ tag }: NoteClientProps) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedTag = tag === "All" ? undefined : tag;

  const debouncedSetSearchQuery = useDebouncedCallback((query: string) => {
    setPage(1);
    setSearchQuery(query);
  }, 300);

  const { data, isLoading  } = useQuery({
    queryKey: ["notes", page, searchQuery, normalizedTag],
    queryFn: () => fetchNotes(page, searchQuery, 12, "created", normalizedTag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;
  
  const router = useRouter();
  const handleClick = () => router.push('/notes/action/create');

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSetSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={handleClick}>Create note +</button>
        
       </header>

       {isLoading && <p>Loading notes...</p>}

      {!isLoading && data?.notes?.length === 0 && (
        <p>
          No notes found for this tag.
        </p>
      )}

      {!isLoading && data && 
        <NoteList notes={data.notes} />
      }
    </div>
  );
}