import { getAllPosts, getUser } from "../service/home.js";
import { getUsers } from "../service/post.js";
import BASE_URL from "../service/index.js";

const getState = ({ getStore, setStore }) => {
  return {
    store: {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NzgyMjg3MCwianRpIjoiOTk2NDJlNWMtYzQ4ZC00NzFhLTlhM2EtYmViNWNhZWEzNjlmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6Nn0sIm5iZiI6MTY0NzgyMjg3MCwiZXhwIjoxNjQ3ODIzNzcwfQ.19g1hs8oRvJeVUXXJb06qjv1VbJt5-biyXD97DxXxRg",
      showNewPost: false,
      showUserCongif: false,
      showFollowers: false,
      showLikes: false,
      refresh: false,
      getAllPosts: [],
      user: [],
      users: [],
      close: false
    },
    actions: {
      handleShow: () => {
        const store = getStore()
        store.close ? setStore({ close: false }) : setStore({ close: true })
        store.showFollowers && setStore({ showFollowers: false }) 
        store.showUserConfig && setStore({ showUserConfig: false })
        store.showLikes && setStore({ showLikes: false }) 
        return store.showNewPost ? setStore({ showNewPost: false }) : setStore({ showNewPost: true })
      },
      handleShowUserConfig: () => {
        const store = getStore()
        store.close ? setStore({ close: false }) : setStore({ close: true })
        store.showNewPost && setStore({ showNewPost: false }) 
        store.showFollowers && setStore({ showFollowers: false })
        store.showLikes && setStore({ showLikes: false })
        return store.showUserConfig ? setStore({ showUserConfig: false }) : setStore({ showUserConfig: true })
      },
      handleShowFollowers: () => {
        const store = getStore()
        store.close ? setStore({ close: false }) : setStore({ close: true })
        store.showUserConfig && setStore({ showUserConfig: false }) 
        store.showNewPost && setStore({ showNewPost: false }) 
        store.showLikes && setStore({ showLikes: false })
        return store.showFollowers ? setStore({ showFollowers: false }) : setStore({ showFollowers: true })
      },
      handleShowLikes: () => {
        const store = getStore()
        store.close ? setStore({ close: false }) : setStore({ close: true })
        store.showUserConfig && setStore({ showUserConfig: false }) 
        store.showNewPost && setStore({ showNewPost: false }) 
        store.showFollowers && setStore({ showFollowers: false })
        return store.showLikes ? setStore({ showLikes: false }) : setStore({ showLikes: true })
      },
      closeShow: () => {
        const store = getStore()
        store.showNewPost && setStore({ showNewPost: false })
        store.showUserConfig && setStore({ showUserConfig: false })
        store.showFollowers && setStore({ showFollowers: false })
        store.showLikes && setStore({ showLikes: false })
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