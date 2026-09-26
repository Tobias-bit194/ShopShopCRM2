import { useState } from "react";

import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  TagsOutlined,
  TrademarkOutlined,
  ShoppingOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PictureOutlined,
} from "@ant-design/icons";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import useAdminProfile from "../../features/auth/hooks/useAdminProfile";
import { logout } from "../../features/auth/services/auth.service";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Order Management",
    path: "/orders",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: "Customers",
    path: "/customers",
    icon: <TeamOutlined />,
  },
  {
    label: "Categories",
    path: "/categories",
    icon: <TagsOutlined />,
  },
  {
    label: "Brands",
    path: "/brands",
    icon: <TrademarkOutlined />,
  },
  {
    label: "Products",
    path: "/products",
    icon: <ShoppingOutlined />,
  },
  {
    label: "Banners",
    path: "/banners",
    icon: <PictureOutlined />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <UserOutlined />,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] =
    useState(false);

  const navigate = useNavigate();

  const {
    profile,
    isLoading,
  } = useAdminProfile();

  const handleLogout = async () => {
    await logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <aside
      className={`
        flex h-screen shrink-0 flex-col
        border-r border-[#EAECF0]
        bg-white py-5
        transition-all duration-300

        dark:border-gray-800
        dark:bg-gray-900

        ${
          collapsed
            ? "w-[72px] px-3"
            : "w-[230px] px-4"
        }
      `}
    >
      {/* Header */}
      <div
        className={`
          mb-8 flex h-10 items-center

          ${
            collapsed
              ? "justify-center"
              : "justify-between px-2"
          }
        `}
      >
        {!collapsed && (
          <div>
            <h1
              className="
                text-[20px] font-bold
                tracking-tight
                text-[#43AE75]

                dark:text-emerald-400
              "
            >
              DEALP <ShoppingCartOutlined/>RT
            </h1>

            <p
              className="
                text-[10px]
                text-[#98A2B3]

                dark:text-gray-500
              "
            >
              Management
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() =>
            setCollapsed((prev) => !prev)
          }
          className="
            flex h-8 w-8
            cursor-pointer
            items-center justify-center
            rounded-lg
            text-[#667085]
            transition

            hover:bg-[#F2F4F7]

            dark:text-gray-400
            dark:hover:bg-gray-800
            dark:hover:text-gray-200
          "
        >
          {collapsed ? (
            <MenuUnfoldOutlined />
          ) : (
            <MenuFoldOutlined />
          )}
        </button>
      </div>

      {/* Menu title */}
      {!collapsed && (
        <p
          className="
            mb-2 px-2
            text-[11px] font-medium
            text-[#98A2B3]

            dark:text-gray-500
          "
        >
          Main menu
        </p>
      )}

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={
              collapsed
                ? item.label
                : undefined
            }
            className={({ isActive }) =>
              `
                flex h-[42px]
                items-center
                rounded-lg
                text-[13px]
                font-medium
                transition-all
                duration-200

                ${
                  collapsed
                    ? "justify-center"
                    : "gap-3 px-3"
                }

                ${
                  isActive
                    ? `
                        bg-[#4CAF7A]
                        text-white
                        shadow-sm

                        dark:bg-emerald-600
                      `
                    : `
                        text-[#667085]

                        hover:bg-[#F5F7F9]
                        hover:text-[#344054]

                        dark:text-gray-400
                        dark:hover:bg-gray-800
                        dark:hover:text-gray-100
                      `
                }
              `
            }
          >
            <span
              className="
                flex w-5
                justify-center
                text-[16px]
              "
            >
              {item.icon}
            </span>

            {!collapsed && (
              <span>{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Profile */}
      <div
        className="
          border-t
          border-[#EAECF0]
          pt-4

          dark:border-gray-800
        "
      >
        <div
          className={`
            flex items-center
            rounded-lg p-2
            transition

            hover:bg-[#F5F7F9]

            dark:hover:bg-gray-800

            ${
              collapsed
                ? "justify-center"
                : "gap-3"
            }
          `}
        >
          <NavLink
            to="/profile"
            className={`
              flex min-w-0
              items-center

              ${
                collapsed
                  ? "justify-center"
                  : "flex-1 gap-3"
              }
            `}
          >
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="
                  h-9 w-9 shrink-0
                  rounded-full
                  border border-[#EAECF0]
                  object-cover

                  dark:border-gray-700
                "
              />
            ) : (
              <div
                className="
                  flex h-9 w-9
                  shrink-0
                  items-center justify-center
                  rounded-full
                  bg-[#EAF7F0]
                  text-[#43AE75]

                  dark:bg-emerald-950
                  dark:text-emerald-400
                "
              >
                <UserOutlined />
              </div>
            )}

            {!collapsed && (
              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-[12px]
                    font-semibold
                    text-[#344054]

                    dark:text-gray-200
                  "
                >
                  {isLoading
                    ? "Loading..."
                    : profile
                      ? `${profile.firstName} ${profile.lastName}`
                      : "Admin"}
                </p>

                <p
                  className="
                    truncate
                    text-[10px]
                    text-[#98A2B3]

                    dark:text-gray-500
                  "
                >
                  {profile?.email ?? "—"}
                </p>
              </div>
            )}
          </NavLink>

          {!collapsed && (
            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="
                flex h-8 w-8
                shrink-0
                cursor-pointer
                items-center justify-center
                rounded-lg
                text-[#98A2B3]
                transition

                hover:bg-red-50
                hover:text-red-500

                dark:text-gray-500
                dark:hover:bg-red-950/40
                dark:hover:text-red-400
              "
            >
              <LogoutOutlined />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;