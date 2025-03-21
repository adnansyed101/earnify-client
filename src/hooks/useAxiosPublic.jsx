import axios from "axios";

// Server Link -- https://earnify-snowy.vercel.app

const axiosPublic = axios.create({
  baseURL: "https://earnify-snowy.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
