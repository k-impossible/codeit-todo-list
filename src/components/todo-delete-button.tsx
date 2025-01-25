"use client";

import Image from "next/image";
import style from "./css/todo-detail.module.css";
import { useActionState, useEffect, useRef } from "react";
import { deleteTodoAction } from "@/actions/delete-todo-action";
import { useRouter } from "next/navigation";

/**
 * @name TodoDeleteButton
 * @description 상세 페이지의 할 일 삭제 버튼 컴포넌트입니다. props로 todoId를 받아 deleteTodoAction을 실행합니다.
 * @param id 할 일 id입니다.
 */

export default function TodoDeleteButton({ id }: { id: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(deleteTodoAction, null);
  const router = useRouter();

  // 서버액션 상태가 변경되면 상태에 따라 alert를 띄웁니다. 성공하면 메인 페이지로 이동합니다.
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    } else if (state && state.status) {
      router.push("/");
      alert("삭제되었습니다.");
    }
  }, [state, router]);
  return (
    <form ref={formRef} action={formAction}>
      <input name="id" value={id} hidden readOnly />
      <div
        className={style.delete_btn}
        onClick={() => {
          if (isPending) return;

          if (confirm("정말 삭제하시겠습니까?")) {
            formRef.current?.requestSubmit();
          }
        }}
      >
        <Image src="/icons/X.png" alt="delete" width={16} height={16} />
        <span>{isPending ? "삭제중..." : "삭제하기"}</span>
      </div>
    </form>
  );
}
