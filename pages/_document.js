import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
  
    return (
      <Html lang="kr">
        <Head>
          <meta charSet="UTF-8" />
          <link passHref rel="icon" href="https://xn--vk1by6xrzecngs4l6obxj.com/favicon.ico" />
          <meta name="naver-site-verification" content="c551c54c615fa8b95537e7834e49aa0c067c9978" />
          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument