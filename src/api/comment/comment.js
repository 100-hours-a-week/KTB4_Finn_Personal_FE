import { apiFetch } from "../common";

export function getCommentByPostId(postId){
    return apiFetch(`/posts/${postId}/comments`);
}

export function registerComment(commentInfo){
    const contentInfo = {
        comment : commentInfo.content
    }
    return apiFetch(`/posts/${commentInfo.postId}/comments`,{
        method: `POST`,
        body: JSON.stringify(contentInfo)
    });
}

export function updateComment(commentInfo){
    const contentInfo = {
        comment : commentInfo.content
    }
    return apiFetch(`/comments/${commentInfo.commentId}`,{
        method: `PATCH`,
        body: JSON.stringify(contentInfo)
    });
}

export function deleteComment(commentId){
    return apiFetch(`/comments/${commentId}`,{
        method: `DELETE`
    });
}