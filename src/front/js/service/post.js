import BASE_URL from "./index.js";

export const getUsers = (id) => {
  const url = `${BASE_URL}/api/user/${id}`;
  return fetch(url, {
    method: "GET",
  });
};