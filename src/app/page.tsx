import SearchBar from "@/components/searchbar";
import style from "./page.module.css";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <SearchBar />
        <div className={style.checklist_container}>
          <div className={style.checklist}>
            <div>
              <img src="../images/todo_head.png" alt="todo_head" />
            </div>
            <div className={style.check_item}>
              <img src="../icons/chk_default.png" alt="chk_default" />
              <span>비타민 챙겨먹기</span>
            </div>
            <div className={style.check_item}>
              <img src="../icons/chk_default.png" alt="chk_default" />
              <span>비타민 챙겨먹기</span>
            </div>
          </div>
          <div className={style.checklist}>
            <div>
              <img src="../images/done_head.png" alt="done_head" />
            </div>
            <div className={`${style.check_item} ${style.done}`}>
              <img src="../icons/chk_frame.png" alt="chk_frame" />
              <span>비타민 챙겨먹기</span>
            </div>
            <div className={`${style.check_item} ${style.done}`}>
              <img src="../icons/chk_frame.png" alt="chk_frame" />
              <span>비타민 챙겨먹기</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
