import axios from "axios";
const BASE_URL = "http://localhost:8081/api";

export async function getUserID(username) {
  let userID = { status: null, id: null };
  userID.id = await axios
    .get(`${BASE_URL}/users/user-id/${username}`)
    .then(function (response) {
      const resData = response.data;
      let id = null;
      if (resData.status === "success") {
        if (resData.data.length > 0) {
          id = resData.data[0].id;
          userID.status = "success";
        }
      } else {
        userID.status = "no matching user";
      }
      return id;
    })
    .catch(function (response) {
      userID.status = "error";
      return null;
    });
  return userID;
}

export async function getUserDetails(username) {
  const userDetails = { status: null, userData: null };
  userDetails.userData = await axios
    .get(`${BASE_URL}/users/by-username/${username}`)
    .then(function (response) {
      const resData = response.data;
      if (resData.status === "success") {
        let userData = { firstName: null, lastName: null, userID: null };
        if (resData.data.length == 0) {
          userDetails.status = "no matching user";
        } else {
          const user = resData.data[0];
          userData = {
            firstName: user.first_name,
            lastName: user.last_name,
            userID: user.id,
          };
        }
        return userData;
      }
    })
    .catch(function (response) {
      userDetails.status = "error";
      return null;
    });
  return userDetails;
}

export async function getFollowDetails(userID) {
  const followDetailsPackage = {
    status: null,
    followDetails: { followers: null, following: null },
  };

  followDetailsPackage.followDetails.followers = await axios
    .get(`${BASE_URL}/followers/${userID}/followed-by`)
    .then(function (response) {
      const resData = response.data;
      if (resData.status === "success") {
        return resData.data;
      } else {
        return null;
      }
    })
    .catch(function (response) {
      followDetailsPackage.status = "error obtaining followed-by";
      return null;
    });

  followDetailsPackage.followDetails.following = await axios
    .get(`${BASE_URL}/followers/${userID}/following`)
    .then(function (response) {
      const resData = response.data;
      if (resData.status === "success") {
        followDetailsPackage.status = "success";
        return resData.data;
      } else {
        return null;
      }
    })
    .catch(function (response) {
      followDetailsPackage.status = "error obtaining following";
      return null;
    });

  return followDetailsPackage;
}

export async function getListDetails(userID) {
  const listDetails = { status: null, details: null };
  listDetails.details = await axios
    .get(`${BASE_URL}/authors/${userID}/gratitude-lists`)
    .then(function (response) {
      const resData = response.data;
      if (resData.status === "success") {
        listDetails.status = "success";
        return resData.data;
      } else {
        listDetails.status = "no matching user"; // not technically true
      }
    })
    .catch(function (response) {
      listDetails.status = "error";
    });
  return listDetails;
}
