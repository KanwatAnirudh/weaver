import useAuth from "./useAuth";

export default function useRole() {
  const { role } = useAuth();

  return {
    role,
    isVolunteer: role === "volunteer",
    isNgo: role === "ngo",
    isAdmin: role === "admin",
  };
}
