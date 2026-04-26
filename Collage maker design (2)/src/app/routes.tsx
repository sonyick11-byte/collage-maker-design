import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ClientsPage } from "./pages/ClientsPage";
import { ProductsPage } from "./pages/ProductsPage";
import { CalculatorsPage } from "./pages/CalculatorsPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { ProfilePage } from "./pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "clients", Component: ClientsPage },
      { path: "products", Component: ProductsPage },
      { path: "calculators", Component: CalculatorsPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);
