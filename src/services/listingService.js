import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndpoint = "/listings";
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

function listingUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getListings() {
  return http.get(apiEndpoint);
}

export function getListing(listingId) {
  return http.get(listingUrl(listingId));
}

export function updateListingPrice(listingId, userId, bid) {
  return http.post(`${apiEndpoint}/updatePrice`, { listingId, userId, bid });
}

export function saveListing(listing) {
  return http.post(apiEndpoint, listing, config);
}

export function editListing(listing, id) {
  return http.put(listingUrl(id), listing, config);
}

export function deleteListing(listingId) {
  return http.delete(listingUrl(listingId));
}

export function getMyListings() {
  return http.get("/my/listings");
}
