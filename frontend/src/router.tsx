import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PizzaPage from "./pages/PizzaPage";
import PizzasPage from "./pages/PizzasPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export const router = createBrowserRouter([
    {
        path: "", element: <MainLayout />, children: [
            {
                index: true, element: <Navigate to={"login"} />,
            },
            {
                path: "pizzas", element: <PizzasPage />,
            },
            {
                path: "pizza", element: <PizzaPage />,
            },
            {
                path: "login", element: <LoginPage />,
            },
            {
                path: "register", element: <RegisterPage />,
            },

        ],

    },
]);