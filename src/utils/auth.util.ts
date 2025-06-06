import { UserModel } from "../types/user/user.type";

export const LocalStorageEventTarget = new EventTarget();

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

export const getAccessTokenFromLS = () => {
  return localStorage.getItem("access_token") || "";
};

export const setAccessTokenToSessionStorage = (access_token: string) => {
  sessionStorage.setItem("access_token", access_token);
};

export const getAccessTokenFromSessionStorage = () => {
  return sessionStorage.getItem("access_token") || "";
};

export const setProfileToLS = (profile: UserModel) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

export const getProfileFromLS = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};

export const clearLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");

  const clearLSEvent = new Event("clearLS");
  LocalStorageEventTarget.dispatchEvent(clearLSEvent);
};
