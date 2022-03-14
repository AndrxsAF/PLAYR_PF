import BASE_URL from "./index.js";

export const getUsers = (id) => {
  const url = `${BASE_URL}/api/user/${id}`;
  return fetch(url, {
    method: "GET",
  });
};

export const getPost = (id) => {
  const url = `${BASE_URL}/api/post/${id}`;
  return fetch(url, {
    method: "GET",
  });
}

export const getUser = (token) => {
  const url = `${BASE_URL}/api/user/`;
  return fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};