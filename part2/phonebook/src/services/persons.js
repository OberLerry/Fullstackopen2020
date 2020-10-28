import axios from "axios";

const base_url = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(base_url).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(base_url, newObject).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${base_url}/${id}`).then((response) => response.data);
};

const updateNumber = (id, newPerson) => {
  return axios
    .put(`${base_url}/${id}`, newPerson)
    .then((response) => response.data);
};

export default { getAll, create, remove, updateNumber };
