import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR" className="bg-chrome">
      <Head>
        <meta name="theme-color" content="#1e1e1e" />
      </Head>
      <body className="bg-chrome antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
