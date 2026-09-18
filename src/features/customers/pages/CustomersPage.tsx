import useCustomers from "../hooks/useCustomers";

import CustomersHeader from "../ui/CustomersHeader/CustomersHeader";
import CustomersTable from "../ui/CustomersTable/CustomersTable";

const CustomersPage = () => {
  const {
    customers,
    isLoading,
    error,
    refetch,
  } = useCustomers();

  return (
    <div className="space-y-6">
      <CustomersHeader />

      {error && (
        <div
          className="
            rounded-xl
            border border-red-200
            bg-red-50
            px-4 py-3
            text-xs text-red-500

            dark:border-red-900
            dark:bg-red-950/30
            dark:text-red-400
          "
        >
          {error}
        </div>
      )}

      <CustomersTable
        customers={customers}
        isLoading={isLoading}
        onSuccess={refetch}
      />
    </div>
  );
};

export default CustomersPage;