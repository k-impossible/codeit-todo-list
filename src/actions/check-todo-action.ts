"use server";

import { revalidatePath } from "next/cache";

export async function CheckTodoAction(_: any, formData: FormData) {
  const id = Number(formData.get("id"));
  const reqBody = {
    name: formData.get("name")?.toString(),
    memo: formData.get("memo")?.toString(),
    imageUrl: formData.get("imageUrl")?.toString(),
    isCompleted: formData.get("isCompleted") === "true" ? false : true,
  };

  console.log("CHECK TODO ACTION", id, reqBody);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/items/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(reqBody),
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
  } catch (error) {
    return { status: false, error: `TODO 수정에 실패했습니다: ${error}` };
  }
}
