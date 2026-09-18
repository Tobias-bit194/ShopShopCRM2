import { useCallback, useEffect, useState } from "react";

import { getAdminProfile } from "../services/profile.service";
import type { AdminProfile } from "../types/profile.types";

const useAdminProfile = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAdminProfile();

      setProfile(data);
    } catch (error) {
      console.error("Failed to load admin profile:", error);
      setError("Failed to load admin profile");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
  };
};

export default useAdminProfile;