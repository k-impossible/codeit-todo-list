"use client";

import { EditTodoAction } from "@/actions/edit-todo-action";
import style from "./css/todo-detail.module.css";
import { Todo } from "@/types";
import Image from "next/image";
import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
export default function TodoEditButton({
  originalTodo,
  currentTodo,
  selectedFile,
}: {
  originalTodo: Todo;
  currentTodo: Todo;
  selectedFile: File | null;
}) {
  const router = useRouter();
  const isEdited = JSON.stringify(originalTodo) !== JSON.stringify(currentTodo);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(EditTodoAction, null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fileInputRef.current && selectedFile) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(selectedFile);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [selectedFile]);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    } else if (state && state.status) {
      router.push("/");
      alert("수정되었습니다.");
    }
  }, [state, router]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="id" value={currentTodo.id} hidden readOnly />
      <input name="name" value={currentTodo.name} hidden readOnly />
      <input name="memo" value={currentTodo.memo} hidden readOnly />
      <input name="imageUrl" value={currentTodo.imageUrl} hidden readOnly />
      <input
        name="isCompleted"
        value={String(currentTodo.isCompleted)}
        hidden
        readOnly
      />
      <input
        id="fileInput"
        name="imageFile"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
      />
      <div
        className={`${isEdited ? style.edited : ""}`}
        onClick={() => {
          if (isPending) return;

          if (isEdited) {
            formRef.current?.requestSubmit();
          } else {
            alert("수정된 내용이 없습니다.");
          }
        }}
      >
        <Image src="/icons/check.png" alt="edit" width={16} height={16} />
        <span>{isPending ? "수정 중..." : "수정 완료"}</span>
      </div>
    </form>
  );
}
