import { apiFetch } from "../common";

export function getPostDetail(postId){
    return apiFetch(`/posts/${postId}`);
}

export function getPosts(
  filter = "RECENT",
  cursor = null,
  size = 10
) {
    const params = new URLSearchParams({
        filter,
        size: String(size),
    });

    if (cursor) {
        params.set("cursorCreatedAt", cursor.createdAt);
        params.set("cursorId", String(cursor.id));

        if (filter === "POPULAR" && cursor.likeCount != null) {
            params.set(
                "cursorLikeCount",
                String(cursor.likeCount)
            );
        }
    }

    return apiFetch(`/posts?${params.toString()}`);
}

export function getPostsBySearchTag(
    tag,
    startDate,
    endDate,
    cursor = null,
    size = 10
) {
    const params = new URLSearchParams({
        tag,
        startDate,
        endDate,
        size: String(size),
    });

    if (cursor) {
        params.set(
            "cursorCreatedAt",
            cursor.createdAt
        );

        params.set(
            "cursorId",
            String(cursor.id)
        );
    }

    return apiFetch(
        `/posts/search?${params.toString()}`
    );
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
