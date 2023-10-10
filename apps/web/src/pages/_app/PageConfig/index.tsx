import { FC, ReactElement } from 'react';
import MainLayout from './MainLayout';

interface MainLayoutProps {
  children: ReactElement;
}

const PageConfig: FC<MainLayoutProps> = ({ children }) => {
  console.log('');
  return <MainLayout>{children}</MainLayout>;
};

export default PageConfig;
