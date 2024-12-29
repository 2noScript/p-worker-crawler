import { ReactElement } from "react";
interface IPrivateRouteProps {
  children: ReactElement;
}

function PrivateRoute(props: IPrivateRouteProps) {
  const { children } = props;
  return <div>{children}</div>;
}

export default PrivateRoute;