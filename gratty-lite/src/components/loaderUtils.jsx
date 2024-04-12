import axios from "axios";
const BASE_URL = "http://localhost:8081/api/";
export async function getUserDetails(username) {
  let userData = null;
  userData = await axios
    .get(`${BASE_URL}users/by-username/${username}`)
    .then(function (response) {
      const resData = response.data;
      if (resData.message === "success") {
        return resData.data;
      }
    })
    .catch(function (response) {
      return null;
    });
  return userData;
}
