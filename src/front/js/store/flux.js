import { getAllPosts, getUser } from "../service/home.js";
import { getUsers } from "../service/post.js";
import BASE_URL from "../service/index.js";

const getState = ({ getStore, setStore }) => {
  return {
    store: {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0ODE0NDIyMSwianRpIjoiOTVlZjQ3OWItNjU3ZS00ODZjLWIyMjEtYWU2MGNkMDU1ZmFhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6Nn0sIm5iZiI6MTY0ODE0NDIyMSwiZXhwIjoxNjUwNTYzNDIxfQ.zaK9TrSYiZKDWZq2sH11QphkIQzb_Zl1oMwPQZpF7m4",
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
      setLogin: (email, password, history) => {
        const url = BASE_URL;
        console.log(email, password)
        fetch(url + "/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: email,
            password: password
          }),
        }).then((response) => response.json())
          .then(data => {
            console.log({data})
            if(data.token){
              localStorage.setItem("token", data.token);
              history.push("/")
            }
          })
      },
      setRegister: (email, user, password, history) => {
        const url = BASE_URL;
        fetch(url + "/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            username: user,
            password: password,
          }),
        }).then((response) => response.json())
        .then( (data) => {
          console.log(data)
          history.push("/login")
        })
        .catch(err => console.log(err))
      },
      getToken: () => {
        return localStorage.getItem("token");
      },
      setToken: () => {
        localStorage.setItem("token", token);
        setStore({ token: token });
      }
    }
  };
}
  export default getState;