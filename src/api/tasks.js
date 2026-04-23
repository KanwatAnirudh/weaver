import axiosInstance from "./axiosInstance";

export async function fetchTasks(filters = {}) {
  const response = await axiosInstance.get("/tasks", { params: filters });
  return response.data?.data?.tasks || [];
}

export async function createTask(payload) {
  const response = await axiosInstance.post("/tasks", payload);
  return response.data?.data?.task || null;
}

export async function fetchNgoTasks() {
  const response = await axiosInstance.get("/tasks/ngo");
  return response.data?.data?.tasks || [];
}

export async function applyToTask(taskId) {
  const response = await axiosInstance.post(`/tasks/${taskId}/apply`);
  return response.data?.data?.task || null;
}


