import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { fetchHeatMapAreas } from "../api/heatmap";
import useAuth from "../hooks/useAuth";

export const HeatMapContext = createContext(null);

export function HeatMapProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [areas, setAreas] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshHeatMap = useCallback(async () => {
    if (!isAuthenticated) {
      setAreas([]);
      setLastUpdated(null);
      return;
    }

    setIsLoading(true);
    try {
      const payload = await fetchHeatMapAreas();
      setAreas(payload.areas || []);
      setLastUpdated(payload.updatedAt || new Date().toISOString());
    } catch (_error) {
      setAreas([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshHeatMap();
    const timerId = setInterval(refreshHeatMap, 10000);

    return () => {
      clearInterval(timerId);
    };
  }, [refreshHeatMap]);

  const value = useMemo(
    () => ({
      areas,
      lastUpdated,
      isLoading,
      setAreas,
      setLastUpdated,
      refreshHeatMap,
    }),
    [areas, isLoading, lastUpdated, refreshHeatMap],
  );

  return <HeatMapContext.Provider value={value}>{children}</HeatMapContext.Provider>;
}
