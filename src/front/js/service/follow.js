import BASE_URL from "./index.js";

export const showFollowStatus = (token, id) => {
    if (id == undefined) {
        return false
    }
    const url = `${BASE_URL}/api/follow/${id}`;
    return fetch(url, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    });
};

export const showFollowers = (id) => {
    if (id == undefined) {
        return false
    }
    const url = `${BASE_URL}/api/follow/followers/${id}`;
    return fetch(url, {
        method: "GET"
    });
};

export const showFollowings = (id) => {
    if (id == undefined) {
        return false
    }
    const url = `${BASE_URL}/api/follow/followings/${id}`;
    return fetch(url, {
        method: "GET"
    });
};

export const doFollow = (token, body) => {
    const url = `${BASE_URL}/api/follow/`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            authorization: `Bearer ${token}`
        }
    });
};

export const unfollow = (token, body) => {
    const url = `${BASE_URL}/api/follow/`;
    return fetch(url, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
            authorization: `Bearer ${token}`
        }
    });
};