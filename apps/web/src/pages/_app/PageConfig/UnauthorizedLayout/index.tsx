import { FC, ReactElement } from 'react';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => {
  console.log('hello');
  return <main>{children}</main>;
};

export default UnauthorizedLayout;
