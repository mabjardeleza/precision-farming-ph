import localforage from "localforage";

// Side effects Services
export function getAuthToken() {
  return localforage.getItem("authToken");
}

export function setAuthToken(token) {
  return localforage.setItem("authToken", token);
}

export function removeAuthToken() {
  return localforage.removeItem("authToken");
}
