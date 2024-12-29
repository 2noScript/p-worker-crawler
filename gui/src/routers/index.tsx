import { lazy, ReactElement, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { URL,LAYOUTS } from 'constants/app'
import DefaultLayout from "layouts/DefaultLayout";
import PrivateRoute from "routers/PrivateRoute";


const Home = lazy(() => import("pages/Home"));

interface IRouteItem {
  path: string;
  component: ReactElement;
  layout: string;
  private: boolean;
}

const userRoute: IRouteItem[] = [
  {
    path: URL.Home,
    component: <Home />,
    layout: LAYOUTS.DEFAULT,
    private: false,
  },
];

const itemsRoute = [...userRoute];

export default function Routers() {
  return (
    <Routes>
      {itemsRoute.map((item) => {
        let element = item.component;
        element = <Suspense fallback={null}>{element}</Suspense>;

        switch (item.layout) {
          case LAYOUTS.DEFAULT:
            element = <DefaultLayout>{element}</DefaultLayout>;
            break;
          default:
            break;
        }

        if (item.private) {
          element = <PrivateRoute>{element}</PrivateRoute>;
        }

        return <Route key={item.path} path={item.path} element={element} />;
      })}
    </Routes>
  );
}