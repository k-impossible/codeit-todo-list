"use client";

import { Todo } from "@/types";
import style from "./css/todo-detail.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import TodoItem from "./todo-item";
import TodoEditButton from "./todo-edit-button";
import TodoDeleteButton from "./todo-delete-button";

/**
 * @name TodoDetail
 * @description 상세 페이지 컴포넌트입니다. todo 수정을 위한 formdata를 다루며,
 * props로 todo 원본을 받아 하위 컴포넌트에게 수정할 todo state와 상태 관리 함수를 전달하고 렌더링합니다.
 * @param todo 할 일 객체입니다.
 */

export default function TodoDetail({ todo }: { todo: Todo }) {
  const [currentTodo, setCurrentTodo] = useState<Todo>(todo);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(todo.imageUrl || null);

  // todo가 변경될 때마다 currentTodo를 업데이트합니다.
  useEffect(() => {
    setCurrentTodo({
      ...todo,
    });
  }, [todo]);

  // 이미지 파일을 선택하면 preview를 업데이트하고 currentTodo에 imageUrl을 저장합니다.
  // 파일 이름이 유효하지 않거나 파일 크기가 5MB를 초과하면 경고창을 띄웁니다.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const fileName = file.name;
      const fileSize = file.size;
      const validFileName = /^[a-zA-Z0-9_.-]+$/.test(fileName);

      if (!validFileName) {
        alert(
          "파일 이름은 영문, 숫자, 밑줄(_), 하이픈(-), 점(.)만 포함할 수 있습니다."
        );
        return;
      }

      if (fileSize > 5 * 1024 * 1024) {
        // 5MB
        alert("파일 크기가 5MB를 초과할 수 없습니다.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setCurrentTodo({
        ...currentTodo,
        imageUrl: file.name,
      });
    } else {
      setPreview(todo.imageUrl || null);
    }
  };

  // input 값이 변경될 때마다 currentTodo를 업데이트합니다.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentTodo({
      ...currentTodo,
      [name]: value,
    });
  };

  return (
    <div className={style.container}>
      <TodoItem
        todo={currentTodo}
        isDetail={true}
        handleChange={handleChange}
      />
      <div className={style.input_container}>
        <div
          className={`${style.image_container} ${
            preview ? style.image_edit_container : ""
          }`}
        >
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={64}
              height={64}
              layout="responsive"
              className={style.preview_image}
            />
          ) : (
            <Image
              src="/images/upload.png"
              alt="upload"
              width={64}
              height={64}
            />
          )}
          <div className={`${style.image_btn}`}>
            <label htmlFor="fileInput">
              <Image
                src={`/icons/${preview ? "edit" : "plus_slate"}.png`}
                alt="plus"
                width={24}
                height={24}
              />
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div
          className={style.memo_container}
          style={{ backgroundImage: `url("../images/memo.png")` }}
        >
          <h1>Memo</h1>
          <textarea
            name="memo"
            defaultValue={todo.memo}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={style.button_container}>
        <TodoEditButton
          originalTodo={todo}
          currentTodo={currentTodo}
          selectedFile={selectedFile}
        />

        <TodoDeleteButton id={todo.id} />
      </div>
    </div>
  );
}
