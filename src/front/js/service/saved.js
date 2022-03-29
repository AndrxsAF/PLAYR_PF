import BASE_URL from "./index.js";

export const userSaved = (token, id) => {
    const url = `${BASE_URL}/api/saved/${id}`;
    return fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  };

export const showSaved = (token) => {
    const url = `${BASE_URL}/api/saved/`;
    return fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  };

  export const save = (token, body) => {
    const url = `${BASE_URL}/api/saved/`;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  };

  export const unsave = (token, body) => {
    const url = `${BASE_URL}/api/saved/`;
    return fetch(url, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  };