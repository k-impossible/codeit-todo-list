import style from "./layout.module.css";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css"
        />
      </head>
      <body>
        <div className={style.container}>
          <header>
            <section>
              <Link href={"/"}>
                <img
                  src="../images/logo_large.png"
                  alt="logo_large"
                  className={style.logo_large}
                />
                <img
                  src="../images/logo_small.png"
                  alt="logo_small"
                  className={style.logo_small}
                />
              </Link>
            </section>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
