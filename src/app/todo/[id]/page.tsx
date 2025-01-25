import style from "./page.module.css";
import { Todo } from "@/types";
import TodoDetail from "@/components/todo-detail";

/**
 * @name Page
 * @description todo dynamic page 입니다. 개별 todo API를 요청해서 응답값인 todo를 TodoDetail 컴포넌트에 전달하고 렌더링합니다.
 * @param params URL 파라미터 {id: string}입니다.
 */

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items/${id}`,
    { next: { tags: [`todo-${id}`] } }
  );
  if (!response.ok) {
    console.log(`TODO를 불러오는데 실패했습니다. ${response.statusText}`);
  }

  const todo: Todo = await response.json();

  return (
    <div className={style.container}>
      <section>
        <TodoDetail todo={todo} />
      </section>
    </div>
  );
}
