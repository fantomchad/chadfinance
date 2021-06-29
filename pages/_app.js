import { GlobalStyles } from 'twin.macro'
import '../styles/globals.css'
import React from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>)
}

export default MyApp
