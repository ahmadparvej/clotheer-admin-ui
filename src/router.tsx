import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import LoginPage from "./pages/login/login";
import { DashboardLayout } from "./layout/DashboardLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { RootLayout } from "./layout/RootLayout";
import { UsersPage } from './pages/users/Users';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "/users",
            element: <UsersPage />,
            children: [
              {
                path: ":id",
                element: <div>user detail</div>,
              },
              {
                path: ":id/edit",
                element: <div>user edit</div>,
              },
              {
                path: ":id/add",
                element: <div>user add</div>,
              },
            ],
          },
        ],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
