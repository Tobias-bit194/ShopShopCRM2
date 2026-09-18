import { useEffect, useState } from "react";

import { getAdminProfile } from "../services/auth.service";
import type { Admin } from "../types/auth.types";

const useAdminProfile = () => {
  const [profile, setProfile] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const admin = await getAdminProfile();

        setProfile(admin);
      } catch (error) {
        console.error("Failed to load admin profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  return {
    profile,
    isLoading,
  };
};

export default useAdminProfile;