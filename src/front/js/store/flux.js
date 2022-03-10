const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NjkzMTUyMywianRpIjoiZTYzNmYwM2YtNGE5NS00Y2RiLWFhOGItYTA3MGM1OTU5NjZjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6M30sIm5iZiI6MTY0NjkzMTUyMywiZXhwIjoxNjQ2OTMyNDIzfQ.J2WRBrsTWR040_P23HoOvDeLUdZMd_3XhYjmhDNOVp4",
			showNewPost: false
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
			handleShow: () => {
				const store = getStore()
				return store.showNewPost ? setStore({showNewPost: false}) : setStore({showNewPost: true})
			}
		}
	};
};

export default getState;
