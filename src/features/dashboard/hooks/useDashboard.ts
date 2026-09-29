import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getDashboard } from "../services/dashboard.service";

import type { DashboardData } from "../types/dashboard.types";

const useDashboard = () => {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchDashboard =
    useCallback(async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getDashboard();

        setDashboard(data);
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error,
        );

        setError(
          "Failed to load dashboard",
        );
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
};

export default useDashboard;