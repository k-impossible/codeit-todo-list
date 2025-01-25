"use client";

import Image from "next/image";
import style from "./css/todo-detail.module.css";
import { useActionState, useEffect, useRef } from "react";
import { deleteTodoAction } from "@/actions/delete-todo-action";
import { useRouter } from "next/navigation";
export default function TodoDeleteButton({ id }: { id: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(deleteTodoAction, null);
  const router = useRouter();

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
