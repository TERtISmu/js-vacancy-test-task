import { FC, ReactElement } from 'react';
import { AppShell } from '@mantine/core';

import Header from './Header';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <AppShell
    header={<Header />}
    styles={() => ({
      main: {
        paddingLeft: '0',
        paddingRight: '0',
        paddingBottom: '0',
        paddingTop: '104px',
      },
    })}
  >
    {children}
  </AppShell>
);

export default MainLayout;
