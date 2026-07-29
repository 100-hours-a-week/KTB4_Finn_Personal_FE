import PostForm from "../components/post/PostForm";
import Header from "../components/layout/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { registerPostImage } from "../api/image/image";
import { createPost, getPostDetail, updatePost } from "../api/post/post";
import { UserInfoContext } from "../context/UserInfoContext";


function PostFormPage({mode}){

    const {currentUser} = useContext(UserInfoContext);
;
    const [post, setPost] = useState(null);

    const {postId} = useParams();
    const isEdit = mode === "edit";

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if(!isEdit){
            return;
        }
        const fetchPost = async () => {
            const response = await getPostDetail(postId);
            setPost(response.data);
            console.log("게시물 : ", response.data);
        }
        fetchPost();
    }, [isEdit, postId]);


    const handleCreate = async({
        title,
        content,
        contentImg,
        tags
    }) => {
        try{
            let contentImgUrl = null;
            setIsSubmitting(true);

            if(contentImg){
                const uploadImageResponse = await registerPostImage(contentImg);
                contentImgUrl = uploadImageResponse.data.imageUrl;   
            }

            const createdPostResponse = await createPost({
                title : title,
                content : content,
                contentImg : contentImgUrl,
                tags : tags,
            });

            navigate(`/posts/${createdPostResponse.data.id}`);
        } catch (error) {
            console.error("게시물 작성 실패:", error.data);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = async ({
        title,
        content,
        contentImg,
    }) => {
        try{
            let contentImgUrl = contentImg;
            setIsSubmitting(true);

            if(contentImg instanceof File){
                const uploadImageResponse = await registerPostImage(contentImg);
                contentImgUrl = uploadImageResponse.data.imageUrl;
            }

            const editedPostResponse = await updatePost(postId, {
                title : title,
                content : content,
                contentImg : contentImgUrl
            });

            console.log("수정할 데이터 : ", contentImgUrl);

            navigate(`/posts/${editedPostResponse.data.postId ?? editedPostResponse.data.id ?? postId}`);
        }catch(error){
            console.log("게시물 수정 실패 : ", error);
        }finally{
            setIsSubmitting(false);
        }
    }

    if (isEdit && !post) {
         return <p>게시물을 불러오는 중입니다...</p>;
    }

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
                    initValues={isEdit ? post : null}
                    onSubmit={isEdit ? handleEdit : handleCreate}
                    isSubmitting={isSubmitting}
                />
            </main>

        </>
    
  );
}

export default PostFormPage;
