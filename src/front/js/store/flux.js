const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0Njk1MzQ4OSwianRpIjoiM2IyM2NlMDgtY2RmZC00N2ZhLThmNWMtYjVhYWE2OWQ0N2VkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6M30sIm5iZiI6MTY0Njk1MzQ4OSwiZXhwIjoxNjQ2OTU0Mzg5fQ._qGETML3y8LKd7CT76BUaDu0BCNVHDApyAgZwh6IMnM",
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
