import style from "./searchbar.module.css";

export default function SearchBar() {
  return (
    <div className={style.container}>
      <div className={style.searchbar}>
        <input type="text" placeholder="할 일을 입력해주세요." />
      </div>

      <div className={style.btn}>
        <img src="../icons/plus_black.png" />
        <span>추가하기</span>
      </div>
    </div>
  );
}
