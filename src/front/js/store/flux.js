const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0Njk0MDU5NSwianRpIjoiMzQwMzlmMjctYzJhMi00YzE1LTljN2YtZTBmOTdmZDYyNTAzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6M30sIm5iZiI6MTY0Njk0MDU5NSwiZXhwIjoxNjQ2OTQxNDk1fQ.o1KhAw8vnpRtA9rT1Rp4DEy1Fw395AF9CjYgPTMUZlQ",
			showNewPost: false,
			refresh: false
		},
		actions: {
			// setTopAnime: (topAnimeList) => {
			// 	setStore({topAnime: topAnimeList });
			// },
			// setAnime : (anime) => {
			// 	setStore({anime: anime});
			// },
			// setCopyTopAnime: (copyTopAnime) => {
			// 	setStore({copyTopAnime: copyTopAnime})
			// },
			handleShow: () => {
				const store = getStore()
				return store.showNewPost ? setStore({showNewPost: false}) : setStore({showNewPost: true})
			},
			handleRefresh: () => {
				const store = getStore()
				return store.refresh ? setStore({refresh: false}) : setStore({refresh: true})
			}
		}
	};
};

export default getState;
