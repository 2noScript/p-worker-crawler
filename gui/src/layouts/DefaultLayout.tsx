import { ReactElement } from "react";

interface IDefaultLayoutProps {
  children: ReactElement;
}

function DefaultLayout(props: IDefaultLayoutProps) {
  const { children } = props;
  return <div>{children}</div>;
}

export default DefaultLayout;