import style from "./layout.module.css";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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
                <Image
                  src="/images/logo_large.png"
                  alt="logo_large"
                  width={151}
                  height={40}
                  className={style.logo_large}
                />

                <Image
                  src="/images/logo_small.png"
                  alt="logo_small"
                  width={71}
                  height={40}
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
