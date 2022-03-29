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

export const getUserByToken = (token) => {
  const url = `${BASE_URL}/api/user/`;
  return fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};

export const getComments = (id) => {
  const url = `${BASE_URL}/api/comment/post/${id}`;
  return fetch(url, {
    method: "GET",
  });
}

export const uploadNewComment = (body, token) => {
  const url = `${BASE_URL}/api/comment/`
  return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
}

export const deleteComment = (body) => {
  const url = `${BASE_URL}/api/comment/`
  return fetch(url, {
      method: "DELETE",
      body: JSON.stringify(body)
  })
}

export const deletePost = (body, token) => {
  const url = `${BASE_URL}/api/post/`
  return fetch(url, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
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