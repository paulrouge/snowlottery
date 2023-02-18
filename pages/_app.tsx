import React from 'react'
import { AppProps } from 'next/app'
import { GlobalContextProvider } from '../utils/context/globalContext'

import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  )
}

export default MyApp;