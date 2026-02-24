import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/layout";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
