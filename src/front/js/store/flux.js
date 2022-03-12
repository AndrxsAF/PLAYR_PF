import { getAllPosts, getUser } from "../service/home.js";
import { getUsers } from "../service/post.js";
import BASE_URL from "../service/index.js"

const getState = ({ getStore, getActions, setStore }) => {
 return {
    store: {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0Njk0MDU5NSwianRpIjoiMzQwMzlmMjctYzJhMi00YzE1LTljN2YtZTBmOTdmZDYyNTAzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6M30sIm5iZiI6MTY0Njk0MDU5NSwiZXhwIjoxNjQ2OTQxNDk1fQ.o1KhAw8vnpRtA9rT1Rp4DEy1Fw395AF9CjYgPTMUZlQ",
			showNewPost: false,
			refresh: false
      topAnime: [],
      anime: {},
      copyTopAnime: [],
      getAllPosts: [],
      user: [],
      users: [],
      token: "",
    },
      actions: {
        	handleShow: () => {
				const store = getStore()
				return store.showNewPost ? setStore({showNewPost: false}) : setStore({showNewPost: true})
			},
			handleRefresh: () => {
				const store = getStore()
				return store.refresh ? setStore({refresh: false}) : setStore({refresh: true})
			}
      setTopAnime: (topAnimeList) => {
        setStore({ topAnime: topAnimeList });
      },
      setAnime: (anime) => {
        setStore({ anime: anime });
      },
      setCopyTopAnime: (copyTopAnime) => {
        setStore({ copyTopAnime: copyTopAnime });
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
      },
    },
  };
	

export default getState;
