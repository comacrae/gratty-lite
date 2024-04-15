import axios from "axios";
const BASE_URL = "http://localhost:8081/api";
export async function getUserDetails(username) {
  let userDetails = null;
  userDetails = await axios
    .get(`${BASE_URL}/users/by-username/${username}`)
    .then(function (response) {
      const resData = response.data;
      if (resData.status === "success") {
        let userData = {};
        if (resData.data.length == 0) {
          userDetails.status = "no matching user";
        } else {
          const user = resData.data[0];
          userData = {
            status: "success",
            firstName: user.first_name,
            lastName: user.last_name,
            userID: user.id,
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

export async function getUserID(username) {
  let userID = { status: null, id: null };
  userID = await axios
    .get(`${BASE_URL}/users/user-id/${username}`)
    .then(function (response) {
      const resData = response.data;
      if (resData.status === "success") {
        if (resData.data.length > 0) {
          userID.id = resData.data[0].id;
          userID.status = "success";
        }
      } else {
        userID.status = "no matching user";
      }
      return userID;
    })
    .catch(function (response) {
      return { status: "error" };
    });
  return userID;
}

export async function getFollowDetails(userID) {
  const followDetails = { status: null, followers: null, following: null };

  followDetails.followers = await axios
    .get(`${BASE_URL}/followers/${userID}/followed-by`)
    .then(function (response) {
      const resData = response.data;
      if (resData.status === "success") {
        return resData.data;
      }
    })
    .catch(function (response) {
      followDetails.status = "error obtaining followed-by";
      return null;
    });

  followDetails.following = await axios
    .get(`${BASE_URL}/followers/${userID}/following`)
    .then(function (response) {
      const resData = response.data;
      if (resData.status === "success") {
        followDetails.status = "success";
        return resData.data;
      }
    })
    .catch(function (response) {
      followDetails.status = "error obtaining following";
      return null;
    });

  return followDetails;
}
