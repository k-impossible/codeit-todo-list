import { Todo } from "@/types";

/**
 * @name getTodoList
 * @description 할 일 목록 API를 요청하는 함수입니다.
 * @returns Todo배열 타입을 반환합니다.
 */
export default async function getTodoList(): Promise<Todo[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items`
  );
  if (!response.ok) {
    console.log(`할 일 목록을 불러오는데 실패했습니다. ${response.statusText}`);
  }
  return await response.json();
}
