import BASE_URL from "./index.js";

export const sendMessage = () => {
    const url = `${BASE_URL}/api/app/message/send`;
    return fetch(url, {
        method: "POST",
        headers: {"Access-Control-Allow-Origin":"*",
        "Content-Type": "application/json"}
    })
}

export const RecvMessage = () => {
    const url = `${BASE_URL}/api/app/message/recv`;
    return fetch(url, {
        method: "GET",
        headers:  {"Access-Control-Allow-Origin":"*",
        "Content-Type": "application/json"}
    })

}