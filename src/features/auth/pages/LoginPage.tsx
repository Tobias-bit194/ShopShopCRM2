import LoginForm from "../ui/LoginForm";

const LoginPage = () => {
  return (
    <div
      className="
        flex min-h-screen items-center justify-center
        bg-[#F7F9F8] px-4
        dark:bg-[#0B0F14]
      "
    >
      <div
        className="
          w-full max-w-[420px]
          rounded-3xl
          border border-[#EAECF0]
          bg-white p-8
          shadow-sm

          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#43AE75]">
            ShopCRM
          </h1>

          <h2 className="mt-6 text-xl font-bold text-[#1D2939] dark:text-white">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-[#98A2B3]">
            Sign in to your admin account
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;