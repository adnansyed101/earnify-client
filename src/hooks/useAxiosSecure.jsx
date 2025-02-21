import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Server Link -- https://earnify-snowy.vercel.app

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
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          logOut();
          setLoading(true);
          navigate("/signin");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, setLoading]);

  return axiosSecure;
};

export default useAxiosSecure;
