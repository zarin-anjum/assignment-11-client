import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: () =>
      axiosSecure.get("/users/me").then((r) => r.data),
  });

  return {
    role: data?.role || "user",
    dbUser: data,
    isLoading,
  };
};

export default useUserRole;