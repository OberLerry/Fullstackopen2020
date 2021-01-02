import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const addBlog = async (title, author, url) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, { title, author, url }, config);
  return response.data;
};

const setToken = (newToken) => {
  token = newToken;
};

const likeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(baseUrl.concat(`/${blog.id}`), blog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(baseUrl.concat(`/${id}`), config);
  return response.data;
};

const getUserID = () => {
  return token.id;
};
export default { getAll, setToken, addBlog, likeBlog, deleteBlog, getUserID };
