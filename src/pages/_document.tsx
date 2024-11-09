import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>{/* Adicione aqui suas tags de meta ou fontes */}
      </Head>
      <body className="bg-primary text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
