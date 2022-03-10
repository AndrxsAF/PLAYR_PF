import BASE_URL from "./index.js";

export const uploadNewPost = (body, token) => {
    const url = `${BASE_URL}/api/post/`
    return fetch(url, {
        method: "POST",
        body: body,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
