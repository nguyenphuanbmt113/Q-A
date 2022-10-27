import axios from "./customaxios";
const getAllUser = () => {
  return axios.get("api/v1/participant/all");
};
const getUserWithPaginate = (page) => {
  return axios.get(`api/v1/participant?page=${page}&limit=3`);
};
const deleteUserWithId = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};
const postCreateUser = (email, password, username, role, img) => {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  form.append("username", username);
  form.append("role", role);
  form.append("userImage", img);
  return axios.post("api/v1/participant", form);
};
const putUpdateUser = (id, username, role, img) => {
  const form = new FormData();
  form.append("id", id);
  form.append("username", username);
  form.append("role", role);
  form.append("userImage", img);
  return axios.put("api/v1/participant", form);
};
export {
  getAllUser,
  getUserWithPaginate,
  deleteUserWithId,
  postCreateUser,
  putUpdateUser,
};
