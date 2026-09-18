import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

const DashboardLayout = () => {
  return (
    <div
      className="
        flex h-screen overflow-hidden
        bg-[#F7F9F8]
        text-[#1D2939]
        transition-colors duration-300
        dark:bg-[#0B0F14]
        dark:text-gray-100
      "
    >
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />

        <main
          className="
            scrollbar-hide
            min-h-0 flex-1
            overflow-y-auto
            p-6 lg:p-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;