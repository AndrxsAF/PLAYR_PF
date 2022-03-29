import BASE_URL from "./index.js";

export const changeUserConfig = (body, token) => {
    const url = `${BASE_URL}/api/user/user`
    return fetch(url, {
        method: "PUT",
        body: body,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}