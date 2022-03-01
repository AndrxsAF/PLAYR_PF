import BASE_URL from "./index.js";

export const getAllPosts = () => {
  const url = `${BASE_URL}/api/post/all`;
  return fetch(url, {
    method: "GET",
  });
};

// const URL = "https://api.jikan.moe/v4";
// // https://api.jikan.moe/v4/top/anime
// // "https://api.jikan.moe/v4/anime"

// export const getTopAnime = () => {
//     const url = URL + "/top/anime";
//     return fetch(url);
// } 

// export const getDetailAnime = (id) => {
//     const url = `${URL}/anime/${id}`;
//     return fetch(url);
// }