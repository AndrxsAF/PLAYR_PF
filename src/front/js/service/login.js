import BASE_URL from "./index";

const Login = () => {
    const url = BASE_URL
    fetch(url + "/users/login", { method: POST, mode: "no-cors", headers: { "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"},
    body: JSON.stringify({
        email: email,
        user: user,
        password: password,
    })
}).then(response => response.json());

}

export default Login