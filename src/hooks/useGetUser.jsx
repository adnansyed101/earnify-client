import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useGetUser = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: userDB } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/user?email=${user?.email}`);
      return data;
    },
  });
  return { userDB: userDB.data[0] };
};

export default useGetUser;
