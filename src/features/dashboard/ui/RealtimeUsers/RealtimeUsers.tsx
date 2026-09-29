import { MoreOutlined } from "@ant-design/icons";

import type { RealtimeUsers as RealtimeUsersType } from "../../types/dashboard.types";

interface RealtimeUsersProps {
  data: RealtimeUsersType;
}

const RealtimeUsers = ({
  data,
}: RealtimeUsersProps) => {
  const maxUsers = Math.max(
    ...data.perMinute.map(
      (item) => item.users,
    ),
    1,
  );

  return (
    <div className="px-5 pb-5 pt-5">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-medium text-[#98A2B3] dark:text-gray-500">
          Users in last{" "}
          {data.windowMinutes} minutes
        </p>

        <button
          type="button"
          className="
            flex h-7 w-7 cursor-pointer
            items-center justify-center
            rounded-lg text-[#98A2B3]
            transition
            hover:bg-[#F5F7F9]
            hover:text-[#344054]

            dark:hover:bg-gray-800
            dark:hover:text-gray-200
          "
        >
          <MoreOutlined />
        </button>
      </div>

      <h3 className="text-[28px] font-bold leading-tight text-[#1D2939] dark:text-white">
        {data.total}
      </h3>

      <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
        Users per minute
      </p>

      <div className="mt-5 flex h-12 items-end gap-1">
        {data.perMinute.map(
          (item) => {
            const height =
              (item.users /
                maxUsers) *
              100;

            return (
              <div
                key={item.time}
                title={`${item.users} users`}
                style={{
                  height: `${Math.max(
                    height,
                    8,
                  )}%`,
                }}
                className="
                  min-w-0 flex-1
                  rounded-t-[3px]
                  bg-[#4CAF7A]
                  transition-all
                  duration-300
                  hover:bg-[#3F9F6F]
                "
              />
            );
          },
        )}
      </div>
    </div>
  );
};

export default RealtimeUsers;