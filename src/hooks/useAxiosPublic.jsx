import axios from "axios";

// Server Link -- https://earnify-snowy.vercel.app

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
