import { getAllPosts, getUser } from "../service/home.js";
import { getUsers } from "../service/post.js";
import BASE_URL from "../service/index.js";

const getState = ({ getStore, setStore }) => {
  return {
    store: {
      showNewPost: false,
      showUserCongif: false,
      showFollowers: false,
      showLikes: false,
      refresh: false,
      getAllPosts: [],
      user: [],
      users: [],
      close: false,

      loginSwitch: false

      message: ""

    },
    actions: {
      setLoginSwitchFalse: () => setStore({ loginSwitch: false }),
      setLoginSwitchTrue: () => setStore({ loginSwitch: true }),
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
      getToken: () => {
        return localStorage.getItem("token") ? localStorage.getItem("token") : "";
      },
      setToken: () => {
        localStorage.setItem("token", token);
        setStore({ token: token });
      },
      setMessage: () => {
        setStore({ message: message});
      }

    }
  };
}
  export default getState;