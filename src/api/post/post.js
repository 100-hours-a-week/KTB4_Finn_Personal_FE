import { apiFetch } from "../common";

export function getPostDetail(postId){
    return apiFetch(`/posts/${postId}`);
}

export function getPosts(filter = "RECENT"){
    const params = new URLSearchParams({
        filter,
    });

    return apiFetch(`/posts?${params.toString()}`);
}

export function getPostsBySearchTag(tag, startDate, endDate){
    const params = new URLSearchParams({
        tag,
        startDate,
        endDate,

    });
    console.log("요청URL: ", `/posts/search?${params.toString()}`);

    return apiFetch(`/posts/search?${params.toString()}`)
}


export function createPost(postData){
    return apiFetch("/posts", {
        method: `POST`,
        body: JSON.stringify(postData)
    });
}

export function updatePost(postId, postData){

    return apiFetch(`/posts/${postId}`,{
        method:`PATCH`,
        body: JSON.stringify(postData)
    });
}

export function deletePost(postId){
    return apiFetch(`/posts/${postId}`, {
        method: `DELETE`
    });
}
