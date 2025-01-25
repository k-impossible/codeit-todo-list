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

/**
 * @name TodoItem
 * @description 할 일 아이템 컴포넌트입니다.
 * todo의 상태에 따라 체크박스 이미지를 변경하고, 할 일 이름을 보여줍니다.
 * 할 일 진행상태를 수정할 경우 EditTodoAction을 실행하고 수정 성공 시 스타일이 변경됩니다.
 * 할 일을 클릭하면 할 일 상세 페이지로 이동합니다.
 * 상세 페이지에서는 할 일 이름을 수정할 수 있고 스타일이 변경됩니다.
 * @param todo 할 일 객체입니다.
 * @param isDetail 상세 페이지인지 여부입니다.
 * @param handleChange 할 일 이름 변경 이벤트 핸들러입니다.
 */

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

  // 서버액션 실패 시 alert를 띄웁니다.
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
