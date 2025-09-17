'use client';
import css from "@/components/NoteForm/NoteForm.module.css"
import { useId } from "react";
import { createNote } from "@/lib/api/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { NewNoteData } from "@/types/note";
import { useNoteStore } from '@/lib/store/noteStore';


export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const queryClient = useQueryClient();
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
	  // 4. Коли користувач змінює будь-яке поле форми — оновлюємо стан
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };


  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push('/notes/filter/All');
    },
  });
  const router = useRouter();
	const handleCancel = () => router.push('/notes/filter/All');
	const fieldId = useId();
  
  const handleSubmit = (formData: FormData) => {
    const values: NewNoteData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    tag: formData.get("tag") as string,
  };
     mutate(values);
  };


  return (
    <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <input  id={`${fieldId}-title`} type="text" name="title" className={css.input} defaultValue={draft?.title} onChange={handleChange}/>
        </div>

        <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <textarea 
            id={`${fieldId}-content`}
            name="content"
            rows={8}
          className={css.textarea}
          defaultValue={draft?.content} onChange={handleChange}
            />
        </div>

        <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <select id={`${fieldId}-tag`} name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
            </select>
        </div>

        <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
            Cancel
            </button>
            <button
            type="submit"
            className={css.submitButton}
                               >
            Create note
            </button>
        </div>
</form>
  );
}

