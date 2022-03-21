import BASE_URL from "./index.js";

export const showLikeStatus = (token, id) => {
    if (id == undefined) {
        return false
    }
    const url = `${BASE_URL}/api/like/${id}`;
    return fetch(url, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    });
};

export const getLikes = (id) => {
    const url = `${BASE_URL}/api/like/post/${id}`;
    return fetch(url, {
      method: "GET",
    });
  }
  
  export const likePost = (token, body) => {
    const url = `${BASE_URL}/api/like/`
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
  }
  
  export const dislikePost = (token, body) => {
    const url = `${BASE_URL}/api/like/`
    return fetch(url, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
  }