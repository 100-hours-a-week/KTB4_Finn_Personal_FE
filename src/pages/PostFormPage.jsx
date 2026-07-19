import PostForm from "../components/post/PostForm";
import Header from "../components/layout/Header";
import { Link, useParams } from "react-router-dom";

import { currentUser, mockPosts } from "../data/mockData";


function PostFormPage({mode}){

    const {postId} = useParams();
    const isEdit = mode === "edit";

    const post = isEdit ? mockPosts.find((post) => post.id === Number(postId)) : null;

    if (isEdit && !post) {
        return <p>게시물을 찾을 수 없습니다.</p>;
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
                    initValues={post}
                    onSubmit={isEdit ? null : null}
                />
            </main>

        </>
    
  );
}

export default PostFormPage;