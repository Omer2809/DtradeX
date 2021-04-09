import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndpoint ="/history";

function memberUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function  getAllHistories() {
  return http.get(apiEndpoint);
}

export function getMemberHistory(memberId) {
  return http.get(apiEndpoint, memberId);
}

export function saveMemberHistory(memberId) {  
  return http.post(apiEndpoint, { memberId });
}

export function deleteHistory(memberId) {
  return http.delete(memberUrl(memberId));
}
