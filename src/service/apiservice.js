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
export { getAllUser, getUserWithPaginate, deleteUserWithId };
