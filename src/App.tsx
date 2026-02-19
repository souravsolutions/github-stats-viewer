import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/home/home";
import MainPage from "./pages/layout";
import { ThemeProvider } from "./components/theme-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "repos",
        element: <h1>Repos</h1>,
      },
    ],
  },
]);
const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
