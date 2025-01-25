"use client";

import Image from "next/image";
import style from "./css/searchbar.module.css";
import { useActionState, useEffect, useRef, useState } from "react";
import { createTodoAction } from "@/actions/create-todo-action";
import getTodoList from "@/api/getTodoList";

/**
 * @name SearchBar
 * @description 메인 페이지의 할 일 입력창 컴포넌트입니다. form 데이터를 받아 createTodoAction을 실행합니다.
 */

export default function SearchBar() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createTodoAction, null);
  const [todoCount, setTodoCount] = useState<number>(0);

  // todo list의 개수를 가져와서 todoCount 상태에 저장합니다. 추가하기 버튼의 스타일을 변경하기 위해 사용합니다.
  useEffect(() => {
    async function fetchTodoCount() {
      const todos = await getTodoList();
      setTodoCount(todos.length);
    }
    fetchTodoCount();
  }, []);

  // 서버액션 상태가 변경되면 상태에 따라 alert를 띄웁니다.
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state, todoCount]);

  // 입력창에서 엔터키를 누르면 form을 submit합니다.
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isPending) return;
      if (!formRef.current?.checkValidity()) {
        alert("내용을 입력해주세요.");
        return;
      }
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
          if (!formRef.current?.checkValidity()) {
            alert("내용을 입력해주세요.");
            return;
          }
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
