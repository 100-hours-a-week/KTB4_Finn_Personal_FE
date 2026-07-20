import { apiFetch } from "../common";

export function login(credentials){
    return apiFetch(`/users/login`, {
        method : "POST",
        body : credentials,
    });
}

export function logout(){
    return apiFetch(`/users/logout`,{
        method : "POST"
    });
}