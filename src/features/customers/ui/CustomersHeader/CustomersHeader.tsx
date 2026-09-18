import { Users } from "lucide-react";

const CustomersHeader = () => {
  return (
    <div
      className="
        flex flex-col gap-4
        rounded-2xl
        border border-[#EAECF0]
        bg-white p-6
        shadow-sm
        transition-colors

        sm:flex-row
        sm:items-center
        sm:justify-between

        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex h-11 w-11
            shrink-0 items-center justify-center
            rounded-xl
            bg-[#ECF7F1]
            text-[#48A375]

            dark:bg-emerald-950/40
            dark:text-emerald-400
          "
        >
          <Users size={20} />
        </div>

        <div>
          <h1
            className="
              text-xl font-bold
              text-[#344054]
              dark:text-gray-100
            "
          >
            Customers
          </h1>

          <p
            className="
              mt-1 text-xs
              text-[#98A2B3]
              dark:text-gray-500
            "
          >
            View and manage your store customers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomersHeader;