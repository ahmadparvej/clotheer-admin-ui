import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/login";
import { DashboardLayout } from './layout/DashboardLayout';
import { AuthLayout } from './layout/AuthLayout';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children: [
            {
                path: "/auth/login",
                element: <LoginPage/>
            }
        ]
    }
])