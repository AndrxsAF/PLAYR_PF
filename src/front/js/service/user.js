import BASE_URL from "./index.js";

export const loginUser = (email, password, history) => {
  return fetch(BASE_URL + "/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: email,
      password: password
    }),
  })
}

export const registerUser = (email, user, password, history) => {
  return fetch(BASE_URL + "/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: user,
      password: password
    }),
  })
}

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
  
