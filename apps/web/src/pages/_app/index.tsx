import { FC } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Global, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import shipTheme from 'theme/ship-theme';
import queryClient from 'query-client';
import { globalStyles } from 'theme/globalStyles';

import PageConfig from './PageConfig';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Shopy</title>
    </Head>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={shipTheme} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <Global styles={globalStyles} />

          <PageConfig>
            <Component {...pageProps} />
          </PageConfig>
        </ModalsProvider>
        <ReactQueryDevtools position="bottom-right" />
      </MantineProvider>
    </QueryClientProvider>
  </>
);

export default App;
