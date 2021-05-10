import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndpoint = "/favorites";

const addFavorite = (listingId, userId) =>
  http.post(apiEndpoint, {
    listingId,
    userId,
  });

const checkFavorite = (listingId, userId) =>
  http.post(`${apiEndpoint}/favorited`, {
    listingId,
    userId,
  });

const deleteFavorite = (id) => http.delete(`${apiEndpoint}/${id}`);

const deleteParticularFavorite = (listingId, userId) =>
  http.post(`${apiEndpoint}/deleteParticular`, { listingId, userId });

const getMyFavorites = () => http.get("/my/favorites");

export default {
  addFavorite,
  deleteFavorite,
  checkFavorite,
  deleteParticularFavorite,
  getMyFavorites
};
