"use server";

import { revalidatePath } from "next/cache";

/**
 * @name deleteTodoAction
 * @description 할 일을 삭제하는 서버액션 함수입니다.
 * @param _ sdk에서 전달하는 파라미터입니다. 사용하지 않습니다.
 * @param formData form 데이터입니다.
 * @returns API 응답 상태 {status: boolean, error: string} 을 반환합니다.
 */
export async function deleteTodoAction(_: any, formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) {
    return { status: false, error: "삭제할 TODO가 없습니다." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
    return { status: false, error: `TODO 삭제에 실패했습니다: ${err}` };
  }
}
