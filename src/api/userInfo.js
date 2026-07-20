import { apiFetch } from "./common";

export function getUserInfo(){
    return apiFetch(`/users/me`);
}