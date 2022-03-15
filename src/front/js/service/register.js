import BASE_URL from "./index";

const register = () => {
    fetch(BASE_URL + "/users/register", {
        method: "POST",
        mode: "no-cors",
        headers: {
         
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }
    })
        
}

export default register