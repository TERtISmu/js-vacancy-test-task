import { FC, ReactElement } from 'react';
import { AppShell } from '@mantine/core';

import Header from './Header';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <AppShell header={<Header />}>{children}</AppShell>
);

export default MainLayout;
