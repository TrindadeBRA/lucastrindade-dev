import '@/styles/globals.css'
import 'font-awesome/css/font-awesome.min.css';

import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <GoogleAnalytics gaId="G-XSV4CR9LYC"/>
    </>
  )
}
