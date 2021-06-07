import http from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}

export function getUser(userId) {
  
  return http.get(`${apiEndpoint}/userProfile/${userId}`);
}

export function updateProfileImage(data, userId) {
  return http.put(`${apiEndpoint}/${userId}`, data);
}

export function deleteImage(userId) {
  return http.put(`${apiEndpoint}/deleteProfileImage/${userId}`);
}
