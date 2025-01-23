"use server";

import { revalidatePath } from "next/cache";

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
