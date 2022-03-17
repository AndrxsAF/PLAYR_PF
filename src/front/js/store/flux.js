import { getAllPosts, getUser } from "../service/home.js";
import { getUsers } from "../service/post.js";
import BASE_URL from "../service/index.js";

const getState = ({ getStore, setStore }) => {
  return {
    store: {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NzQ5MjUzNywianRpIjoiZjJmYzI2N2UtOTVjMy00YzE5LWE0NDgtODdjMTQ3MTgwMGU0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MX0sIm5iZiI6MTY0NzQ5MjUzNywiZXhwIjoxNjQ3NDkzNDM3fQ.f3qEIY-9xW09kVAmhqbENYU-QStPBGNMV9Dg6OAFHMU",
      showNewPost: false,
      showUserCongif: false,
      showFollowers: false,
      refresh: false,
      getAllPosts: [],
      user: [],
      users: []
    },
    actions: {
      handleShow: () => {
        const store = getStore()
        return store.showNewPost ? setStore({ showNewPost: false }) : setStore({ showNewPost: true })
      },
      handleShowUserConfig: () => {
        const store = getStore()
        return store.showUserConfig ? setStore({ showUserConfig: false }) : setStore({ showUserConfig: true })
      },
      handleShowFollowers: () => {
        const store = getStore()
        return store.showFollowers ? setStore({ showFollowers: false }) : setStore({ showFollowers: true })
      },
      handleRefresh: () => {
        const store = getStore()
        return store.refresh ? setStore({ refresh: false }) : setStore({ refresh: true })
      },
      setAllPost: (allPost) => {
        setStore({ allPost: allPost });
      },
      setUser: (user) => {
        setStore({ user: user });
      },
      setUsers: (users) => {
        setStore({ users: users });
      },
      setLogin: () => {
        const url = BASE_URL;
        fetch(url + "/login", {
          method: postMessage,
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            user: user,
            password: password
          }),
        }).then((response) => response.json())
          .then(data => {
            if (data.token == undefined) {
              setTimeout(function () { window.location.replace("/login"); }, 4000);
            } else {
              setTimeout(function () { window.location.replace("/"); }, 4000);
              localStorage.setItem("jwt-token", data.token);
            }
          })
      },
      setRegister: () => {
        const url = BASE_URL;
        fetch(url + "/register", {
          method: POST,
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            user: user,
            password: password,
            verifypassword: verifypassword,
          }),
        }).then((response) => response.json());
      },
      getToken: () => {
        const store = getStore();
        if (store.token) {
          return store.token;
        } else {
          return localStorage.getItem("token");
        }
      },
      setToken: () => {
        localStorage.setItem("token", token);
        setStore({ token: token });
      }
    }
  };
}
  export default getState;