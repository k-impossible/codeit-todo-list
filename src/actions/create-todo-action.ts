"use server";

import { revalidatePath } from "next/cache";

/**
 * @name createTodoAction
 * @description 할 일을 생성하는 서버액션 함수입니다.
 * @param _ sdk에서 전달하는 파라미터입니다. 사용하지 않습니다.
 * @param formData form 데이터입니다.
 * @returns API 응답 상태 {status: boolean, error: string} 을 반환합니다.
 */

export async function createTodoAction(_: any, formData: FormData) {
  const content = formData.get("todoText")?.toString();
  if (!content) {
    return { status: false, error: "내용을 입력해주세요." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: content }),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    revalidatePath("/");
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return { status: false, error: `할 일 생성에 실패했습니다: ${err}` };
  }
}
