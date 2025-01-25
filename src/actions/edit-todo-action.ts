"use server";

import { revalidatePath, revalidateTag } from "next/cache";

/**
 * @name deleteTodoAction
 * @description 할 일을 수정하는 서버액션 함수입니다. 이미지 업로드 API를 요청한 후 성공 시 이미지 URL 응답값과 수정 요청을 보냅니다.
 * @param _ sdk에서 전달하는 파라미터입니다. 사용하지 않습니다.
 * @param formData form 데이터입니다.
 * @returns API 응답 상태 {status: boolean, error: string} 을 반환합니다.
 */

export async function EditTodoAction(_: any, formData: FormData) {
  const id = Number(formData.get("id"));
  let imageUrl = formData.get("imageUrl")?.toString();

  // 이미지 업로드 API 요청
  const imageFile = formData.get("imageFile") as File;
  if (imageUrl !== "" && imageFile && imageFile.size > 0) {
    const imageFormData = new FormData();
    imageFormData.append("image", imageFile);
    try {
      const imageResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/images/upload`,
        {
          method: "POST",
          body: imageFormData,
        }
      );

      if (!imageResponse.ok) {
        throw new Error(imageResponse.statusText);
      }
      const imageResult = await imageResponse.json();
      imageUrl = imageResult.url;
    } catch (error) {
      return { status: false, error: `이미지 업로드에 실패했습니다: ${error}` };
    }
  }

  const reqBody = {
    name: formData.get("name")?.toString(),
    memo: formData.get("memo")?.toString(),
    imageUrl,
    isCompleted: formData.get("isCompleted")?.toString(),
  };

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
    revalidateTag(`todo-${id}`);

    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return { status: false, error: `TODO 수정에 실패했습니다: ${error}` };
  }
}
