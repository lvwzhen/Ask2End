import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
         <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
         <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
         <link rel="manifest" href="/site.webmanifest"></link>
          <meta
            name="description"
            content="Ask to the End use AI."
          />
          <meta
            property="og:description"
            content="Ask to the End use AI."
          />
          <meta property="og:title" content="Ask2End" />
          <meta
            name="twitter:description"
            content="Ask to the End use AI."
          />
          <meta
            property="og:image"
            content="https://www.teach-anything.com/og-image.png"
          />
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:site" content="@lvwzhen"/>
          <meta name="twitter:title" content="Ask2End"/>
          <meta name="twitter:description" content="Ask to the End use AI"/>
          <meta name="twitter:image" content="https://www.teach-anything.com/og-image.png"/>
          <Script
             id="Adsense-id"
             data-ad-client="ca-pub-9181833886721130"
             strategy="beforeInteractive"
             src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
