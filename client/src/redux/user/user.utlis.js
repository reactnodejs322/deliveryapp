import axios from "axios";
export const registerUserUidToMongo = (data) => {
  return axios
    .post("/api/users/firebase-register", data)
    .then((res) => console.log(res.data));
};
