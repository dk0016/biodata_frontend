import axios from "axios";
const serverUrl = "http://localhost:9000";
const service = {
  addBiodata(body) {
    const token = localStorage.getItem("token");
    return axios.post(`${serverUrl}/crud/crud`, body, {
      headers: {
        "x-access-token": token,
      },
    });
  },
  editBiodata(body, id) {
    const token = localStorage.getItem("token");
    return axios.put(`${serverUrl}/crud/crud/${id}`, body, {
      headers: {
        "x-access-token": token,
      },
    });
  },
  getBiodata() {
    const token = localStorage.getItem("token");
    return axios.get(`${serverUrl}/crud/crud`, {
      headers: {
        "x-access-token": token,
      },
    });
  },
  deleteBiodata(id) {
    const token = localStorage.getItem("token");
    return axios.delete(`${serverUrl}/crud/crud/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });
  },
  login(body) {
    const token = localStorage.getItem("token");
    return axios.post(`${serverUrl}/login`, body, {
      headers: {
        "x-access-token": token,
      },
    });
  },
};
export default service;
