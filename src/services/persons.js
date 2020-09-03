import axios from "axios";

const baseUrl = "/api/persons";
// const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  console.log("frontend");
  return req.then(res => res.data);
};

const create = newObject => {
  console.log("frontend");
  const req = axios.post(baseUrl, newObject);
  return req.then(res => res.data);
};

const update = (object_id, newObject) => {
  const req = axios.put(`${baseUrl}/${object_id}`, newObject);
  return req.then(res => res.data);
};

const destroy = object_id => {
  const req = axios.delete(`${baseUrl}/${object_id}`);
  return req.then(res => res.data);
};

export default { getAll, create, update, destroy };
