import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useGetUser = () => {
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();

  const { data: userDB = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/user?email=${user?.email}`);
      return data;
    },
  });

  return { userDB: userDB.data, isLoading };
};

export default useGetUser;
