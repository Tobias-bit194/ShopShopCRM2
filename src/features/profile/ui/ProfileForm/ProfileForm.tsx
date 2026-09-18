import { useEffect, useState } from "react";
import { message } from "antd";
import { Trash2, Upload } from "lucide-react";

import useAdminProfile from "../../hooks/useAdminProfile";
import { updateProfile } from "../../services/profile.service";

const ProfileForm = () => {
  const { profile, isLoading, refetch } = useAdminProfile();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  // Подставляем данные из /me в форму
  useEffect(() => {
    if (!profile) return;

    setFirstName(profile.firstName ?? "");
    setLastName(profile.lastName ?? "");
    setPhone(profile.phone ?? "");
    setAvatar(profile.avatar ?? "");
  }, [profile]);

  // Update profile
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSaving(true);

      await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        avatar,
      });

      message.success("Profile updated successfully");

      await refetch();
    } catch (error: any) {
      console.error("Profile update error:", error);

      message.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="
        w-full flex-1
        rounded-2xl border border-[#EAECF0]
        bg-white p-6
        shadow-sm
        transition-colors

        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#344054] dark:text-gray-100">
          Profile Update
        </h2>

        <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
          Update your personal information and profile photo.
        </p>
      </div>

      {/* Avatar */}
      <div
        className="
          mb-6 flex items-center gap-4
          border-b border-[#EAECF0] pb-6
          dark:border-gray-800
        "
      >
        {avatar ? (
          <img
            src={avatar}
            alt={`${firstName} ${lastName}`}
            className="
              h-16 w-16 shrink-0
              rounded-full object-cover
              border border-[#EAECF0]
              dark:border-gray-700
            "
          />
        ) : (
          <div
            className="
              flex h-16 w-16 shrink-0
              items-center justify-center
              rounded-full
              bg-[#EAF7F0]
              text-xl font-bold text-[#43AE75]

              dark:bg-emerald-950
              dark:text-emerald-400
            "
          >
            {firstName?.[0]?.toUpperCase() ?? "A"}
          </div>
        )}

        <div>
          <p className="mb-2 text-xs font-semibold text-[#344054] dark:text-gray-200">
            Profile photo
          </p>

          <div className="flex gap-2">
            {/* Пока UI */}
            <button
              type="button"
              className="
                flex cursor-pointer items-center gap-2
                rounded-lg bg-[#48A375]
                px-4 py-2
                text-xs font-semibold text-white
                transition
                hover:bg-[#3D8C64]
              "
            >
              <Upload size={14} />
              Upload New
            </button>

            <button
              type="button"
              onClick={() => setAvatar("")}
              className="
                flex cursor-pointer items-center gap-2
                rounded-lg
                border border-[#EAECF0]
                px-4 py-2
                text-xs font-semibold text-[#667085]
                transition

                hover:border-red-200
                hover:bg-red-50
                hover:text-red-500

                dark:border-gray-700
                dark:text-gray-300
                dark:hover:border-red-900
                dark:hover:bg-red-950/30
                dark:hover:text-red-400
              "
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* First Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
              First Name
            </label>

            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={isLoading ? "Loading..." : "First name"}
              disabled={isLoading}
              className="
                w-full rounded-lg
                border border-[#EAECF0]
                bg-[#F8FAF9]
                px-3.5 py-2.5
                text-xs font-semibold
                text-[#344054]
                outline-none transition

                focus:border-[#48A375]
                focus:bg-white
                focus:ring-2
                focus:ring-[#48A375]/10

                disabled:cursor-wait
                disabled:opacity-60

                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-100
                dark:focus:bg-gray-800
              "
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
              Last Name
            </label>

            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={isLoading ? "Loading..." : "Last name"}
              disabled={isLoading}
              className="
                w-full rounded-lg
                border border-[#EAECF0]
                bg-[#F8FAF9]
                px-3.5 py-2.5
                text-xs font-semibold
                text-[#344054]
                outline-none transition

                focus:border-[#48A375]
                focus:bg-white
                focus:ring-2
                focus:ring-[#48A375]/10

                disabled:cursor-wait
                disabled:opacity-60

                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-100
                dark:focus:bg-gray-800
              "
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
              Phone Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={isLoading ? "Loading..." : "+998"}
              disabled={isLoading}
              className="
                w-full rounded-lg
                border border-[#EAECF0]
                bg-[#F8FAF9]
                px-3.5 py-2.5
                text-xs font-semibold
                text-[#344054]
                outline-none transition

                focus:border-[#48A375]
                focus:bg-white
                focus:ring-2
                focus:ring-[#48A375]/10

                disabled:cursor-wait
                disabled:opacity-60

                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-100
                dark:focus:bg-gray-800
              "
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
              Role
            </label>

            <input
              type="text"
              value={profile?.role?.replaceAll("_", " ") ?? ""}
              readOnly
              placeholder={isLoading ? "Loading..." : "Role"}
              className="
                w-full cursor-not-allowed
                rounded-lg
                border border-[#EAECF0]
                bg-[#F2F4F7]
                px-3.5 py-2.5
                text-xs font-semibold
                text-[#98A2B3]
                outline-none

                dark:border-gray-700
                dark:bg-gray-800/50
                dark:text-gray-500
              "
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-[#667085] dark:text-gray-400">
              E-mail
            </label>

            <input
              type="email"
              value={profile?.email ?? ""}
              readOnly
              placeholder={isLoading ? "Loading..." : "E-mail"}
              className="
                w-full cursor-not-allowed
                rounded-lg
                border border-[#EAECF0]
                bg-[#F2F4F7]
                px-3.5 py-2.5
                text-xs font-semibold
                text-[#98A2B3]
                outline-none

                dark:border-gray-700
                dark:bg-gray-800/50
                dark:text-gray-500
              "
            />
          </div>
        </div>

        {/* Actions */}
        <div
          className="
            mt-7 flex justify-end
            border-t border-[#EAECF0]
            pt-5
            dark:border-gray-800
          "
        >
          <button
            type="submit"
            disabled={isSaving || isLoading}
            className="
              cursor-pointer
              rounded-lg bg-[#48A375]
              px-6 py-2.5
              text-xs font-semibold text-white
              transition

              hover:bg-[#3D8C64]

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isSaving ? "Saving..." : "Save Profile Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;