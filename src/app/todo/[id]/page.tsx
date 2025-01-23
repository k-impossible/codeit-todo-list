import style from "./page.module.css";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className={style.container}>
      <section>
        <div>{(await params).id} todo</div>
      </section>
    </div>
  );
}
