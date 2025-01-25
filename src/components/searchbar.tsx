"use client";

import Image from "next/image";
import style from "./css/searchbar.module.css";
import { useActionState, useEffect, useRef, useState } from "react";
import { createTodoAction } from "@/actions/create-todo-action";
import getTodoList from "@/api/getTodoList";

export default function SearchBar() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createTodoAction, null);

  const [todoCount, setTodoCount] = useState<number>(0);

  useEffect(() => {
    async function fetchTodoCount() {
      const todos = await getTodoList();
      setTodoCount(todos.length);
    }
    fetchTodoCount();
  }, []);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state, todoCount]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      formRef.current?.requestSubmit();
    }
  };
  return (
    <form className={style.container} ref={formRef} action={formAction}>
      <div className={style.searchbar}>
        <input
          onKeyDown={onKeyDown}
          type="text"
          placeholder="할 일을 입력해주세요."
          name="todoText"
          required
          disabled={isPending}
        />
      </div>

      <div
        className={`${style.btn} ${todoCount < 1 ? style.empty : ""}`}
        onClick={() => {
          if (isPending) return;
          formRef.current?.requestSubmit();
        }}
      >
        <Image
          src={`/icons/${todoCount < 1 ? "plus_white" : "plus_black"}.png`}
          alt="plus_black"
          width={16}
          height={16}
        />
        <span>{isPending ? "추가중.." : "추가하기"}</span>
      </div>
    </form>
  );
}
