import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'
import Head from 'next/head'
import { css } from '@emotion/react'

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Korea Beef Soup</title>
        <meta name="description" content="Korea Beef Soup" />
      </Head>
      <div css={container}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}

const container = css`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`
export default App
