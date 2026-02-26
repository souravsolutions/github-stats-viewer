import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/layout";
import UserInfo from "./pages/userinfo/UserInfo";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
    },
    {
      path: "/:username",
      element: <UserInfo />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
