const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			topAnime: [],
			anime: {},
			copyTopAnime: []
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
			}
		}
	};
};

export default getState;
