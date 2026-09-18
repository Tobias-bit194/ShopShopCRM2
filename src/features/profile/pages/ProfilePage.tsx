import ProfileCard from "../ui/ProfileCard/ProfileCard";
import ProfileForm from "../ui/ProfileForm/ProfileForm";
import ChangePassword from "../ui/ChangePassword/ChangePassword";

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#344054] dark:text-gray-100">
          Profile
        </h1>
      </div>

      <div className="flex flex-col items-start gap-6 lg:flex-row">
        <div className="flex w-full flex-col gap-5 lg:w-[340px] lg:shrink-0">
          <ProfileCard />
          <ChangePassword />
        </div>

        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;