import BASE_URL from "./index.js";

export const getAllPosts = (tag) => {
  const url = `${BASE_URL}/api/post/search/${tag}`;
  return fetch(url, {
    method: "GET"
  });
};