import TodoItem from "./todo-item";
import style from "./css/todo-list.module.css";
import Image from "next/image";
import getTodoList from "@/api/getTodoList";

export default async function TodoList({ type }: { type: string }) {
  const todos = await getTodoList();
  switch (type) {
    case "todo":
      return (
        <div className={style.checklist}>
          <div>
            <Image
              src="/images/todo_head.png"
              alt="todo_head"
              width={101}
              height={36}
            />
          </div>
          {todos.filter((todo) => !todo.isCompleted).length < 1 ? (
            <div className={style.empty_container}>
              <Image
                className={style.empty_large}
                src="/images/todo_large.png"
                width={240}
                height={240}
                alt="todo_large"
              />
              <Image
                className={style.empty_small}
                src="/images/todo_small.png"
                width={120}
                height={120}
                alt="todo_small"
              />
              <p>
                할 일이 없어요. <br />
                TODO를 새롭게 추가해주세요!
              </p>
            </div>
          ) : (
            todos
              .filter((todo) => !todo.isCompleted)
              .map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )}
        </div>
      );
    case "done":
      return (
        <div className={style.checklist}>
          <div>
            <Image
              src="/images/done_head.png"
              alt="done_head"
              width={101}
              height={36}
            />
          </div>
          {todos.filter((todo) => todo.isCompleted).length < 1 ? (
            <div className={style.empty_container}>
              <Image
                className={style.empty_large}
                src="/images/done_large.png"
                width={240}
                height={240}
                alt="done_large"
              />
              <Image
                className={style.empty_small}
                src="/images/done_small.png"
                width={120}
                height={120}
                alt="done_small"
              />
              <p>
                아직 다 한 일이 없어요. <br />
                해야 할 일을 체크해보세요!
              </p>
            </div>
          ) : (
            todos
              .filter((todo) => todo.isCompleted)
              .map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )}
        </div>
      );
  }
}
