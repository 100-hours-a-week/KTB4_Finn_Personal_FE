import { apiFetch } from "../common";

export function likePost(postId){
    return apiFetch(`/posts/${postId}/like`, {
        method: `POST`
    });
}

export function unlikePost(postId){
    return apiFetch(`/posts/${postId}/like`, {
        method: `DELETE`
    });
}