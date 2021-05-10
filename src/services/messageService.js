import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndpoint = "/messages";

const send = (message, listingId, toId, fromId) =>
  http.post(apiEndpoint, {
    message,
    listingId,
    toId,
    fromId,
  });

// const deleteMessage = (id) => http.delete(`${apiEndpoint}/${id}`);

const getMyMessages = () => http.get("/my/messages/receive");

const getChat = (fromUserId, toUserId, listingId) =>
  http.post("/my/chat", { fromUserId, toUserId, listingId });

const deleteChat = (id) => http.delete(`/my/chat/${id}`);

const deleteForAll = (id) => http.delete(`${apiEndpoint}/forAll/${id}`);

const deleteForMe = (id) => http.delete(`${apiEndpoint}/forMe/${id}`);

export default {
  send,
  deleteForMe,
  deleteForAll,
  getMyMessages,
  getChat,
  deleteChat,
};
