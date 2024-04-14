import axios from "axios";
const BASE_URL = "http://localhost:8081/api/";
export async function getUserDetails(username) {
  let userDetails = null;
  userDetails = await axios
    .get(`${BASE_URL}users/by-username/${username}`)
    .then(function (response) {
      const resData = response.data;
      if (resData.message === "success") {
        let userData = {};
        if (resData.data.length == 0) {
          userDetails.status = "no matching user";
        } else {
          const user = resData.data[0];
          userData = {
            status: "success",
            firstName: user.first_name,
            lastName: user.last_name,
          };
        }
        return userData;
      }
    })
    .catch(function (response) {
      return { status: "error" };
    });
  return userDetails;
}
