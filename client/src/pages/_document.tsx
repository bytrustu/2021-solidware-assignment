import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=Edge; chrome=1" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="점심 멤버를 나누자" />
          <meta property="og:description" content="점심 멤버를 나누자" />
          <meta name="description" content="점심 멤버를 나누자" />
          <meta name="keyword" content="점심, 점심 나누기, 팀 나누기, 멤버 나누기" />
          <title>점심 멤버를 나누자 | 냠냠</title>
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const styledComponentsSheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) => styledComponentsSheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        styledComponentsSheet.getStyleElement(),
      ],
    };
  } finally {
    styledComponentsSheet.seal();
  }
};
