import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://earnify-fwck7sokx-adnans-projects-cdc3618d.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
