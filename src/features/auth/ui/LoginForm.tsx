import { useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";

import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const { handleLogin, isLoading } = useLogin();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123!");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleLogin({
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[#344054] dark:text-gray-300"
        >
          Email
        </label>

        <div className="relative">
          <MailOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]" />

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@example.com"
            autoComplete="email"
            required
            className="
              h-12 w-full rounded-xl
              border border-[#D0D5DD]
              bg-white pl-11 pr-4
              text-sm text-[#344054]
              outline-none transition
              placeholder:text-[#98A2B3]
              focus:border-[#4CAF7A]
              focus:ring-4 focus:ring-[#4CAF7A]/10

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
            "
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-[#344054] dark:text-gray-300"
        >
          Password
        </label>

        <div className="relative">
          <LockOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]" />

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className="
              h-12 w-full rounded-xl
              border border-[#D0D5DD]
              bg-white pl-11 pr-12
              text-sm text-[#344054]
              outline-none transition
              placeholder:text-[#98A2B3]
              focus:border-[#4CAF7A]
              focus:ring-4 focus:ring-[#4CAF7A]/10

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="
              absolute right-4 top-1/2
              -translate-y-1/2
              cursor-pointer text-[#98A2B3]
              transition hover:text-[#667085]
            "
          >
            {showPassword ? (
              <EyeOutlined />
            ) : (
              <EyeInvisibleOutlined />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="
          flex h-12 w-full cursor-pointer
          items-center justify-center
          rounded-xl bg-[#4CAF7A]
          text-sm font-semibold text-white
          transition
          hover:bg-[#3F9F6F]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;