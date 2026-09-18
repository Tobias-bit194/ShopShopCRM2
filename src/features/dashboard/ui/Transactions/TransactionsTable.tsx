import { FilterOutlined } from "@ant-design/icons";

type TransactionStatus = "Paid" | "Pending" | "Canceled";

type Transaction = {
  id: string;
  customerId: string;
  date: string;
  status: TransactionStatus;
  amount: string;
};

const transactions: Transaction[] = [
  {
    id: "1",
    customerId: "#6545",
    date: "01 Oct | 11:29 am",
    status: "Paid",
    amount: "$64",
  },
  {
    id: "2",
    customerId: "#5412",
    date: "01 Oct | 11:29 am",
    status: "Pending",
    amount: "$557",
  },
  {
    id: "3",
    customerId: "#6622",
    date: "01 Oct | 11:29 am",
    status: "Paid",
    amount: "$156",
  },
  {
    id: "4",
    customerId: "#6462",
    date: "01 Oct | 11:29 am",
    status: "Paid",
    amount: "$265",
  },
  {
    id: "5",
    customerId: "#6468",
    date: "01 Oct | 11:29 am",
    status: "Canceled",
    amount: "$120",
  },
];

const statusStyles: Record<TransactionStatus, string> = {
  Paid: "bg-[#EAF7F0] text-[#3F9F6F] dark:bg-emerald-950/40 dark:text-emerald-400",
  Pending:
    "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  Canceled:
    "bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400",
};

const TransactionsTable = () => {
  return (
    <section className="rounded-2xl border border-[#EAECF0] bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1D2939] dark:text-white">
            Transactions
          </h2>

          <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
            Recent customer transactions
          </p>
        </div>

        <button
          type="button"
          className="
            flex cursor-pointer items-center gap-2 rounded-lg
            bg-[#4CAF7A] px-4 py-2
            text-xs font-semibold text-white
            transition hover:bg-[#3F9F6F]
          "
        >
          <FilterOutlined />
          Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left">
          <thead>
            <tr className="border-b border-[#EAECF0] text-xs text-[#98A2B3] dark:border-gray-800">
              <th className="pb-3 font-medium">No.</th>
              <th className="pb-3 font-medium">Customer ID</th>
              <th className="pb-3 font-medium">Order Date</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="
                  border-b border-[#F2F4F7]
                  transition-colors
                  last:border-none
                  hover:bg-[#FAFBFA]
                  dark:border-gray-800
                  dark:hover:bg-gray-800/50
                "
              >
                <td className="py-4 text-xs text-[#98A2B3]">
                  {transaction.id}.
                </td>

                <td className="py-4 text-sm font-semibold text-[#344054] dark:text-gray-200">
                  {transaction.customerId}
                </td>

                <td className="py-4 text-xs text-[#667085] dark:text-gray-400">
                  {transaction.date}
                </td>

                <td className="py-4">
                  <span
                    className={`
                      inline-flex items-center gap-1.5
                      rounded-full px-2.5 py-1
                      text-xs font-semibold
                      ${statusStyles[transaction.status]}
                    `}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {transaction.status}
                  </span>
                </td>

                <td className="py-4 text-right text-sm font-bold text-[#1D2939] dark:text-white">
                  {transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end border-t border-[#EAECF0] pt-4 dark:border-gray-800">
        <button
          type="button"
          className="
            cursor-pointer rounded-full
            border border-[#4CAF7A]
            px-5 py-2
            text-xs font-semibold text-[#3F9F6F]
            transition
            hover:bg-[#EAF7F0]
            dark:text-emerald-400
            dark:hover:bg-emerald-950/30
          "
        >
          View all
        </button>
      </div>
    </section>
  );
};

export default TransactionsTable;