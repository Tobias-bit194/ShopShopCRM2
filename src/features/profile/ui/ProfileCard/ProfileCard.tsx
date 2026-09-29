import {
  Copy,
  PlusCircle,
  Share2,
} from "lucide-react";

import useAdminProfile from "../../hooks/useAdminProfile";

const ProfileCard = () => {
  const { profile, isLoading } = useAdminProfile();

  const fullName = profile
    ? `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim()
    : "Admin";

  const handleCopyEmail = async () => {
    if (!profile?.email) return;

    try {
      await navigator.clipboard.writeText(profile.email);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  const handleShareProfile = async () => {
    if (!profile) return;

    const shareData = {
      title: fullName,
      text: `${fullName} — ${profile.role?.replaceAll("_", " ") ?? "ADMIN"}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      console.error("Failed to share profile:", error);
    }
  };

  const avatarLetter =
    profile?.firstName?.charAt(0)?.toUpperCase() ?? "A";

  const role =
    profile?.role?.replaceAll("_", " ") ?? "ADMIN";

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
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-[#344054] dark:text-gray-100">
          Profile
        </h3>

        <div className="flex items-center gap-1 text-[#98A2B3]">
          <button
            type="button"
            title="Share profile"
            onClick={handleShareProfile}
            disabled={!profile}
            className="
              flex h-8 w-8 cursor-pointer
              items-center justify-center
              rounded-lg
              transition
              hover:bg-[#F5F7F9]
              hover:text-[#344054]
              disabled:cursor-not-allowed
              disabled:opacity-50

              dark:hover:bg-gray-800
              dark:hover:text-gray-200
            "
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        {profile?.avatar ? (
          <img
            src={profile.avatar}
            alt={fullName}
            className="
              mb-3 h-20 w-20
              rounded-full
              object-cover
              ring-4 ring-[#EAF7F0]
              dark:ring-emerald-950
            "
          />
        ) : (
          <div
            className="
              mb-3 flex h-20 w-20
              items-center justify-center
              rounded-full
              bg-[#EAF7F0]
              text-2xl font-bold
              text-[#43AE75]

              dark:bg-emerald-950
              dark:text-emerald-400
            "
          >
            {avatarLetter}
          </div>
        )}

        {/* Name */}
        <h4 className="text-base font-bold text-[#344054] dark:text-gray-100">
          {isLoading ? "Loading..." : fullName}
        </h4>

        {/* Email */}
        <div className="mt-1 flex items-center gap-1.5">
          <span className="text-xs text-[#98A2B3]">
            {isLoading ? "Loading..." : profile?.email ?? "—"}
          </span>

          {profile?.email && (
            <button
              type="button"
              title="Copy email"
              onClick={handleCopyEmail}
              className="
                cursor-pointer
                text-[#98A2B3]
                transition
                hover:text-[#667085]

                dark:hover:text-gray-300
              "
            >
              <Copy size={13} />
            </button>
          )}
        </div>

        {/* Role */}
        <span
          className="
            mt-3 rounded-full
            bg-[#EAF7F0]
            px-3 py-1
            text-[10px] font-semibold
            text-[#3F9F6F]

            dark:bg-emerald-950
            dark:text-emerald-400
          "
        >
          {role}
        </span>

        {/* Social media */}
        <p className="mt-5 text-[11px] text-[#98A2B3]">
          Linked with Social media
        </p>

        <div className="mt-3 flex items-center justify-center gap-4">
          <span
            className="
              text-xs font-medium
              text-[#667085]
              dark:text-gray-400
            "
          >
            Google
          </span>

          <span
            className="
              text-xs font-medium
              text-[#667085]
              dark:text-gray-400
            "
          >
            Facebook
          </span>

          <span
            className="
              text-xs font-medium
              text-[#667085]
              dark:text-gray-400
            "
          >
            X
          </span>
        </div>

        <button
          type="button"
          className="
            mt-5 flex cursor-pointer
            items-center gap-1.5
            rounded-lg
            border border-[#EAECF0]
            px-3 py-2
            text-xs font-medium
            text-[#667085]
            transition

            hover:bg-[#F5F7F9]

            dark:border-gray-700
            dark:text-gray-300
            dark:hover:bg-gray-800
          "
        >
          <PlusCircle size={14} />
          Social media
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;