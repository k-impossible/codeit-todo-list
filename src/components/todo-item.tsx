"use client";

import Image from "next/image";
import style from "./css/todo-item.module.css";
import { Todo } from "@/types";
import { useActionState, useEffect, useRef } from "react";
import { EditTodoAction } from "@/actions/edit-todo-action";
import Link from "next/link";

interface TodoItemProps {
  todo: Todo;
  isDetail?: boolean;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function TodoItem({
  todo,
  isDetail,
  handleChange,
}: TodoItemProps) {
  const checkImage = todo.isCompleted ? "chk_complete" : "chk_default";
  const checkClass = todo.isCompleted ? style.done : "";
  const detailStyle = isDetail ? style.detail : "";
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(EditTodoAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form
      className={`${style.check_item} ${checkClass} ${detailStyle}`}
      ref={formRef}
      action={formAction}
    >
      <input name="id" value={todo.id} hidden readOnly />
      {isDetail || <input name="name" value={todo.name} hidden readOnly />}

      <input name="memo" value={todo.memo} hidden readOnly />
      <input name="imageUrl" value={todo.imageUrl} hidden readOnly />
      <input
        name="isCompleted"
        value={String(!todo.isCompleted)}
        hidden
        readOnly
      />
      <Image
        src={`/icons/${checkImage}.png`}
        alt={checkImage}
        width={32}
        height={32}
        onClick={() => formRef.current?.requestSubmit()}
      />
      {isDetail ? (
        <input
          onChange={handleChange}
          name="name"
          value={todo.name}
          className={style.detail_name}
        />
      ) : (
        <Link href={`/todo/${todo.id}`}>{todo.name}</Link>
      )}
    </form>
  );
}
