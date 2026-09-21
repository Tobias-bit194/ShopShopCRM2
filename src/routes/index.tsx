import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

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

import BrandsPage from "../features/brands/pages/BrandsPage";
import BrandDetailsPage from "../features/brands/pages/BrandDetailsPage";

import BannersPage from "../features/banners/pages/BannersPage";

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
        element: (
          <Navigate
            to="/dashboard"
            replace
          />
        ),
      },

      // Dashboard
      {
        path: "dashboard",
        element: <DashboardPage />,
      },

      // Orders
      {
        path: "orders",
        element: <OrdersPage />,
      },

      // Brands
      {
        path: "brands",
        element: <BrandsPage />,
      },
      {
        path: "brands/:id",
        element: <BrandDetailsPage />,
      },

      // Banners
      {
        path: "banners",
        element: <BannersPage />,
      },

      // Customers
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "customers/:id",
        element: <CustomerDetailsPage />,
      },

      // Categories
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "categories/:id",
        element: <CategoryDetailsPage />,
      },

      // Products
      {
        path: "products",
        element: <ProductsPage />,
      },

      // Profile
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;