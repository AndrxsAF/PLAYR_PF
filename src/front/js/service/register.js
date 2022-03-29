import BASE_URL from "./index";

const Register = () => {
    const url = BASE_URL
    fetch(url + + "/register", { method: POST, mode: "no-cors", headers: { "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"},
    body: JSON.stringify({
        email: email,
        user: user,
        password: password,
        verifypassword: verifypassword
    })
}).then(response => response.json());

}

export default Register