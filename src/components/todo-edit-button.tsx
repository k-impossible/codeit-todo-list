"use client";

import { EditTodoAction } from "@/actions/edit-todo-action";
import style from "./css/todo-detail.module.css";
import { Todo } from "@/types";
import Image from "next/image";
import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * @name TodoEditButton
 * @description 상세 페이지의 할 일 수정 버튼 컴포넌트입니다.
 * @param originalTodo 원본 할 일 객체입니다.
 * @param currentTodo 수정된 할 일 객체입니다.
 * @param selectedFile 선택된 이미지 파일입니다.
 * props로 todo의 원본, 수정중인 todo, 선택된 File을 받아 formdata를 구성해 EditTodoAction을 실행합니다.
 */

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
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(EditTodoAction, null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // todo가 변경되었는지 확인합니다.
  const isEdited = JSON.stringify(originalTodo) !== JSON.stringify(currentTodo);

  // 선택된 파일이 변경되면 file input에 반영합니다.
  useEffect(() => {
    if (fileInputRef.current && selectedFile) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(selectedFile);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [selectedFile]);

  // 서버액션 상태가 변경되면 상태에 따라 alert를 띄웁니다. 성공하면 메인 페이지로 이동합니다.
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
