"use client";

import Image from "next/image";
import style from "./todo-item.module.css";
import { Todo } from "@/types";
import { useActionState, useEffect, useRef } from "react";
import { CheckTodoAction } from "@/actions/check-todo-action";
import Link from "next/link";

export default function TodoItem(todo: Todo) {
  const checkImage = todo.isCompleted ? "chk_complete" : "chk_default";
  const checkClass = todo.isCompleted ? style.done : "";
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(CheckTodoAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form
      className={`${style.check_item} ${checkClass}`}
      ref={formRef}
      action={formAction}
    >
      <input name="id" value={todo.id} hidden readOnly />
      <input name="name" value={todo.name} hidden readOnly />
      <input name="memo" value={todo.memo} hidden readOnly />
      <input name="imageUrl" value={todo.imageUrl} hidden readOnly />
      <input
        name="isCompleted"
        value={String(todo.isCompleted)}
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
      <Link href={`/todo/${todo.id}`}>{todo.name}</Link>
    </form>
  );
}
