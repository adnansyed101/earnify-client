import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut, setLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          logOut();
          setLoading(false);
          navigate("/signin");
        }
      }
    );
  }, [logOut, navigate, setLoading]);

  return axiosSecure;
};

export default useAxiosSecure;
