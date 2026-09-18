import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

import { login } from "../services/auth.service";
import type { LoginPayload } from "../types/auth.types";

const useLogin = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (payload: LoginPayload) => {
    try {
      setIsLoading(true);

      await login(payload);

      message.success("Welcome back!");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          "Email or password is incorrect";

        message.error(errorMessage);
      } else {
        message.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
  };
};

export default useLogin;