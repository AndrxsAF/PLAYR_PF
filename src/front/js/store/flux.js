const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NzA4NjEyNCwianRpIjoiODI0Y2M0M2YtZjU0Yy00NzkzLWE0OTItYWQ1Y2M4OTQ5NDQ4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6M30sIm5iZiI6MTY0NzA4NjEyNCwiZXhwIjoxNjQ3MDg3MDI0fQ.xSi09cVXc1_VV93MP0HGDvHpjFVrlDUX61AtvE4Q1tg",
			showNewPost: false,
			showUserCongif: false,
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
			handleShowUserConfig: () => {
				const store = getStore()
				return store.showUserConfig ? setStore({showUserConfig: false}) : setStore({showUserConfig: true})
			},
			handleRefresh: () => {
				const store = getStore()
				return store.refresh ? setStore({refresh: false}) : setStore({refresh: true})
			}
		}
	};
};

export default getState;
