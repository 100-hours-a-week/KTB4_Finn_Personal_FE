import { apiFetch } from "../common";

export function getUserInfo(){
    return apiFetch(`/users/me`);
}

export function updateUser(userData){
    return apiFetch(`/users/me`,{
        method: `PATCH`,
        body: JSON.stringify(userData)  
    });
}

export function withdraw(){
    return apiFetch(`/users/me`,{
        method: `DELETE`
    });
}

export function updatePassword(passwordData){
    return apiFetch(`/users/me/password`,{
        method: `PATCH`,
        body: JSON.stringify(passwordData)
    });
}