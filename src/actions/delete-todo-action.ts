"use server";

import { revalidatePath } from "next/cache";

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
