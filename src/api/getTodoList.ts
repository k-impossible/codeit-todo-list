import { Todo } from "@/types";

export default async function getTodoList(): Promise<Todo[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items`
  );
  if (!response.ok) {
    console.log(`할 일 목록을 불러오는데 실패했습니다. ${response.statusText}`);
  }
  return await response.json();
}
