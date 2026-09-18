import { useState } from "react";
import { Eye, EyeOff, HelpCircle } from "lucide-react";
import { message } from "antd";

import { changePassword } from "../../services/profile.service";

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      message.warning("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("New passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      message.warning(
        "New password must be different from current password"
      );
      return;
    }

    try {
      setIsSaving(true);

      await changePassword({
        currentPassword,
        newPassword,
      });

      message.success("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);
    } catch (error: any) {
      console.error("Change password error:", error);

      message.error(
        error.response?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="
        rounded-2xl border border-[#EAECF0]
        bg-white p-5
        shadow-sm
        transition-colors
        dark:border-gray-800 dark:bg-gray-900
      "
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#344054] dark:text-gray-100">
            Change Password
          </h3>

          <p className="mt-1 text-[11px] text-[#98A2B3] dark:text-gray-500">
            Update your account password
          </p>
        </div>

        <button
          type="button"
          className="
            flex cursor-pointer items-center gap-1
            text-[11px] font-medium text-[#667085]
            transition hover:text-[#43AE75]
            dark:text-gray-400 dark:hover:text-emerald-400
          "
        >
          Need help
          <HelpCircle size={13} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Current Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
            Current Password
          </label>

          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              autoComplete="current-password"
              className="
                w-full rounded-lg
                border border-[#EAECF0]
                bg-[#F8FAF9]
                px-3.5 py-2.5 pr-10
                text-xs text-[#344054]
                outline-none transition

                placeholder:text-[#98A2B3]

                focus:border-[#48A375]
                focus:bg-white
                focus:ring-2
                focus:ring-[#48A375]/10

                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-100
                dark:placeholder:text-gray-500
                dark:focus:bg-gray-800
              "
            />

            <button
              type="button"
              onClick={() => setShowCurrent((prev) => !prev)}
              className="
                absolute right-3 top-1/2
                -translate-y-1/2 cursor-pointer
                text-[#98A2B3]
                transition hover:text-[#667085]
                dark:hover:text-gray-300
              "
            >
              {showCurrent ? (
                <Eye size={15} />
              ) : (
                <EyeOff size={15} />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
            New Password
          </label>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              autoComplete="new-password"
              className="
                w-full rounded-lg
                border border-[#EAECF0]
                bg-[#F8FAF9]
                px-3.5 py-2.5 pr-10
                text-xs text-[#344054]
                outline-none transition

                placeholder:text-[#98A2B3]

                focus:border-[#48A375]
                focus:bg-white
                focus:ring-2
                focus:ring-[#48A375]/10

                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-100
                dark:placeholder:text-gray-500
                dark:focus:bg-gray-800
              "
            />

            <button
              type="button"
              onClick={() => setShowNew((prev) => !prev)}
              className="
                absolute right-3 top-1/2
                -translate-y-1/2 cursor-pointer
                text-[#98A2B3]
                transition hover:text-[#667085]
                dark:hover:text-gray-300
              "
            >
              {showNew ? (
                <Eye size={15} />
              ) : (
                <EyeOff size={15} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
            Re-enter Password
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              autoComplete="new-password"
              className="
                w-full rounded-lg
                border border-[#EAECF0]
                bg-[#F8FAF9]
                px-3.5 py-2.5 pr-10
                text-xs text-[#344054]
                outline-none transition

                placeholder:text-[#98A2B3]

                focus:border-[#48A375]
                focus:bg-white
                focus:ring-2
                focus:ring-[#48A375]/10

                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-100
                dark:placeholder:text-gray-500
                dark:focus:bg-gray-800
              "
            />

            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="
                absolute right-3 top-1/2
                -translate-y-1/2 cursor-pointer
                text-[#98A2B3]
                transition hover:text-[#667085]
                dark:hover:text-gray-300
              "
            >
              {showConfirm ? (
                <Eye size={15} />
              ) : (
                <EyeOff size={15} />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSaving}
          className="
            mt-1 w-full cursor-pointer
            rounded-lg bg-[#48A375]
            py-2.5
            text-xs font-semibold text-white
            transition

            hover:bg-[#3D8C64]
            active:scale-[0.99]

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isSaving ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;