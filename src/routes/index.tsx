import { createBrowserRouter, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import LoginPage from "../features/auth/pages/LoginPage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import CategoriesPage from "../features/categories/pages/CategoriesPage";
import CategoryDetailsPage from "../features/categories/pages/CategoryDetailsPage";
import ProductsPage from "../features/products/pages/ProductsPage";
import CustomersPage from "../features/customers/pages/CustomersPage";
import CustomerDetailsPage from "../features/customers/pages/CustomerDetailsPage";
import OrdersPage from "../features/orders/pages/OrdersPage";

const router = createBrowserRouter([
  // Auth
  {
    path: "/login",
    element: <LoginPage />,
  },

  // Admin
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "customers/:id",
        element: <CustomerDetailsPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "categories/:id",
        element: <CategoryDetailsPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;