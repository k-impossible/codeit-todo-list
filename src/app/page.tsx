import SearchBar from "@/components/searchbar";
import style from "./page.module.css";
import TodoList from "@/components/todo-list";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <SearchBar />
        <div className={style.checklist_container}>
          <TodoList type="todo" />

          <TodoList type="done" />
        </div>
      </section>
    </div>
  );
}
