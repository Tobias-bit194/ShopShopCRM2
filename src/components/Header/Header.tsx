import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search, Bell, Sun, Moon, User } from "lucide-react";
import useAdminProfile from "../../features/profile/hooks/useAdminProfile";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/orders": "Order Management",
  "/customers": "Customers",
  "/categories": "Categories",
  "/products": "Products",
  "/profile": "Profile",
};

const Header = () => {
  const location = useLocation();
  const { profile } = useAdminProfile();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const pageTitle = pageTitles[location.pathname] ?? "Dashboard";

  return (
    <header
      className="
        sticky top-0 z-10
        flex h-20 shrink-0 items-center justify-between
        border-b border-[#E8ECEA]
        bg-white px-8
        transition-colors
        dark:border-gray-800 dark:bg-gray-900
      "
    >
      {/* Page title */}
      <h1 className="text-2xl font-bold text-[#173D35] dark:text-white">
        {pageTitle}
      </h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative w-96">
          <Search
            size={18}
            className="
              absolute right-4 top-1/2
              -translate-y-1/2
              text-[#98A2B3]
            "
          />

          <input
            type="text"
            placeholder="Search data, users, or reports"
            className="
              w-full rounded-full
              border border-[#EAECF0]
              bg-[#F8FAF9]
              py-2.5 pl-4 pr-11
              text-sm text-[#344054]
              placeholder:text-[#98A2B3]
              outline-none transition
              focus:border-[#4CAF7A]
              focus:ring-2 focus:ring-[#4CAF7A]/10

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-100
            "
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="
            relative flex h-10 w-10
            cursor-pointer items-center justify-center
            rounded-full
            border border-[#EAECF0]
            bg-[#F8FAF9]
            text-[#667085]
            transition
            hover:bg-[#F0F5F2]

            dark:border-gray-700
            dark:bg-gray-800
            dark:text-gray-300
          "
        >
          <Bell size={18} />

          <span
            className="
              absolute right-2.5 top-2.5
              h-2 w-2 rounded-full
              bg-[#F04438]
              ring-2 ring-white
              dark:ring-gray-800
            "
          />
        </button>

        {/* Theme switch */}
        <button
          type="button"
          onClick={toggleTheme}
          title="Toggle theme"
          className="
            relative flex h-10 w-16
            cursor-pointer items-center
            rounded-full
            border border-[#DDE7E1]
            bg-[#EAF7F0]
            p-1
            transition-colors
            focus:outline-none

            dark:border-gray-700
            dark:bg-gray-800
          "
        >
          <div
            className={`
              flex h-8 w-8 items-center justify-center
              rounded-full bg-white
              text-[#3F9F6F]
              shadow-sm
              transition-transform duration-200 ease-in-out

              dark:bg-gray-900
              dark:text-yellow-400

              ${isDarkMode ? "translate-x-6" : "translate-x-0"}
            `}
          >
            {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
          </div>
        </button>

        {/* Admin avatar */}
        {profile?.avatar ? (
          <img
            src={profile.avatar}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="
              h-10 w-10 shrink-0
              rounded-full
              border border-[#EAECF0]
              object-cover
              dark:border-gray-700
            "
          />
        ) : (
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-full
              bg-[#EAF7F0]
              text-[#43AE75]

              dark:bg-emerald-950
              dark:text-emerald-400
            "
          >
            <User size={18} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;