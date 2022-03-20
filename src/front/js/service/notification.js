import BASE_URL from "./index.js";

export const showNotifications = (token) => {
    const url = `${BASE_URL}/api/notification`;
    return fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};