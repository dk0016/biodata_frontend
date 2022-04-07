import axios from "axios";
const serverUrl = "http://localhost:9000";
const service = {
  addBiodata(body) {
    return axios.post(`${serverUrl}/crud/crud`, body);
  },
  editBiodata(body, id) {
    return axios.put(`${serverUrl}/crud/crud/${id}`, body);
  },
  getBiodata() {
    return axios.get(`${serverUrl}/crud/crud`);
  },
  deleteBiodata(id) {
    return axios.delete(`${serverUrl}/crud/crud/${id}`);
  },
};
export default service;
