const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0Njk1NzM0MCwianRpIjoiNDc5ODRiYjgtMzg1Ny00ODBiLWIxYmItZGI5MTVkOTIyMjlhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6M30sIm5iZiI6MTY0Njk1NzM0MCwiZXhwIjoxNjQ2OTU4MjQwfQ.cT92cRyRReEWTyr5fmmdWPfzn_N-oSIpZpuBNjyssnc",
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
