
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			topAnime: [],
			anime: {},
			copyTopAnime: [],
			token:""
		},
		actions: {
			setTopAnime: (topAnimeList) => {
				setStore({topAnime: topAnimeList });
			},
			setAnime : (anime) => {
				setStore({anime: anime});
			},
			setCopyTopAnime: (copyTopAnime) => {
				setStore({copyTopAnime: copyTopAnime})
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
					if (data.token == undefined) 
					{ setTimeout(function()
					{window.location.replace ("/login");},4000);
				} else {setTimeout(function() {window.location.replace ("/");},4000);
					localStorage.setItem("jwt-token", data.token);
			}})
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
};

export default getState;
