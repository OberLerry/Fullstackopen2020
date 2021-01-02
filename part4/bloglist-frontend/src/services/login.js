import axios from "axios";
const baseUrl = "/api/login";

const login = async (info) => {
  const response = await axios.post(baseUrl, info);
  return response.data;
};

export default { login };
