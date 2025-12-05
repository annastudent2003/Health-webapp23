import API from "./apiClient";

// ✅ Example endpoints (expand when backend routes are ready)
export const getDashboardSummary = async () => {
  const res = await API.get("/analytics/summary");
  return res.data;
};

export const getHabits = async () => {
  const res = await API.get("/habits");
  return res.data;
};

export const addHabit = async (habitData) => {
  const res = await API.post("/habits", habitData);
  return res.data;
};

export const checkinHabit = async (habitId) => {
  const res = await API.put(`/habits/${habitId}/checkin`);
  return res.data;
};
