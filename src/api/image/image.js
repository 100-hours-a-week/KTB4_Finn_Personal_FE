import { apiFetch } from "../common";

export function registerPostImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetch(`/images/posts`, {
    method: "POST",
    body: formData,
  });
}

export function registerUserProfile(file) {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetch(`/images/users`, {
    method: "POST",
    body: formData,
  });
}