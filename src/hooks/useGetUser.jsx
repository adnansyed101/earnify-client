import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetUser = () => {
  const axiosSecure = useAxiosSecure()
  const { user, loading } = useAuth();

  const { data: userDB = {}, isLoading, refetch } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user?email=${user?.email}`); 
      return data;
    },
  });

  return { userDB: userDB.data, isLoading, refetch };
};

export default useGetUser;
