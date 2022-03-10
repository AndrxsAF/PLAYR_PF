const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0Njg3MTc4NywianRpIjoiMTE1NDdmZTUtOTI2NS00ODhhLWIxN2UtNDlmMDI2NDZiODJmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6M30sIm5iZiI6MTY0Njg3MTc4NywiZXhwIjoxNjQ2ODcyNjg3fQ.UDlsDLbGTnmKOgp0OB89ms6mM4Cf4d600d4TIC8CG5Q"
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
