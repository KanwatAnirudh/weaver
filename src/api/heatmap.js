import axiosInstance from "./axiosInstance";

export async function fetchHeatMapAreas() {
  const response = await axiosInstance.get("/tasks/heatmap");
  return response.data?.data || { areas: [], updatedAt: null };
}
