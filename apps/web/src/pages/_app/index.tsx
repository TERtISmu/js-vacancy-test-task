import { FC } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Global, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import shipTheme from 'theme/ship-theme';
import { globalStyles } from 'theme/globalStyles';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Shopy</title>
    </Head>
    <MantineProvider theme={shipTheme} withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </ModalsProvider>
    </MantineProvider>
  </>
);

export default App;
