import { useContext } from "react";
import { HeatMapContext } from "../context/HeatMapContext";

export default function useHeatMap() {
  const context = useContext(HeatMapContext);

  if (!context) {
    throw new Error("useHeatMap must be used within HeatMapProvider");
  }

  return context;
}
