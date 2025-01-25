"use server";

import { revalidatePath, revalidateTag } from "next/cache";

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
