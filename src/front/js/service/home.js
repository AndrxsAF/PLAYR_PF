import BASE_URL from "./index.js";

export const getAllPosts = () => {
  const url = `${BASE_URL}/api/post/all`;
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
