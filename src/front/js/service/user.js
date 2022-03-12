import BASE_URL from "./index.js";

export const getAllPosts = (id) => {
  const url = `${BASE_URL}/api/post/user/${id}`;
  return fetch(url, {
    method: "GET",
  });
};

export const getUser = (token) => {
  const url = `${BASE_URL}/api/user/`;
  return fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};

export const getUserByUsername = (username) => {
    const url = `${BASE_URL}/api/user/username/${username}`;
    return fetch(url, {
      method: "GET"
    });
  };
  
