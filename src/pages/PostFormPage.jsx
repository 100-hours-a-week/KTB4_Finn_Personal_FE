import PostForm from "../components/post/PostForm";
import Header from "../components/layout/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { currentUser, mockPosts } from "../data/mockData";
import { registerPostImage } from "../api/image/image";
import { createPost } from "../api/post/post";


function PostFormPage({mode}){

    const {postId} = useParams();
    const isEdit = mode === "edit";

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreate = async({
        title,
        content,
        contentImg,
    }) => {
        try{
            setIsSubmitting(true);

            const uploadImageResponse = await registerPostImage(contentImg);
            const contentImgUrl = uploadImageResponse.data.imageUrl;

            const createdPostResponse = await createPost({
                title : title,
                content : content,
                contentImg : contentImgUrl,
            });

            navigate(`/posts/${createdPostResponse.data.id}`);
        } catch (error) {
            console.error("게시물 작성 실패:", error.data);
        } finally {
            setIsSubmitting(false);
        }
    };

    //const post = isEdit ? mockPosts.find((post) => post.id === Number(postId)) : null;

    // if (isEdit && !post) {
    //     return <p>게시물을 찾을 수 없습니다.</p>;
    // }

    return (
        <>
            <Header currentUser={currentUser} showCreatePostButton = {false} />
            <main className="editor-shell container-inner">
                <Link
                    className="back-link"
                    to={isEdit ? `/posts/${postId}` : "/"}
                >
                    ← {isEdit ? "기록으로 돌아가기" : "피드로 돌아가기"}
                </Link>
                <PostForm
                    mode={mode}
                    initValues={isEdit ? null : null}
                    onSubmit={isEdit ? null : handleCreate}
                />
            </main>

        </>
    
  );
}

export default PostFormPage;