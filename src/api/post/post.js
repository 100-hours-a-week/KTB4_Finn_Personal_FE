import { apiFetch } from "../common";

export function getPostDetail(postId){
    return apiFetch(`/posts/${postId}`);
}

export function createPost(postData){
    return apiFetch("/posts", {
        method: `POST`,
        body: JSON.stringify(postData)
    });
}