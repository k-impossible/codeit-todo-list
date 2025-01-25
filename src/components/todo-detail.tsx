"use client";

import { Todo } from "@/types";
import style from "./css/todo-detail.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import TodoItem from "./todo-item";
import TodoEditButton from "./todo-edit-button";
import TodoDeleteButton from "./todo-delete-button";

export default function TodoDetail({ todo }: { todo: Todo }) {
  const [originalTodo, setOriginalTodo] = useState<Todo>(todo);
  const [currentTodo, setCurrentTodo] = useState<Todo>(todo);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(todo.imageUrl || null);

  useEffect(() => {
    setCurrentTodo({
      ...todo,
    });
  }, [todo]);
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
