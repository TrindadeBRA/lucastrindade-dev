// import { GoogleAnalytics } from '@next/third-parties/google'
// import { Analytics } from '@vercel/analytics/react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR" className='scroll-smooth'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      {/* <GoogleAnalytics gaId="G-XSV4CR9LYC"/>
      <Analytics /> */}
    </Html>
  )
}
