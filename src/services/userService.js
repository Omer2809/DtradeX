import http from "./httpService";
const apiEndpoint = "/users";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
    phone: user.phone,
    isAdmin:user.isAdmin
  });
}

export function getUsers() {
  return http.get(apiEndpoint);
}

export function deleteUser(userId) {
  return http.delete(userUrl(userId));
}