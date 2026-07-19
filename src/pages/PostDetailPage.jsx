import { Link, useParams } from "react-router-dom";

import Header from "../components/layout/Header.jsx";
import PostDetail from "../components/post/PostDetail.jsx";
import CommentSection from "../components/comment/CommentSection.jsx";

import {
  currentUser,
  mockPosts,
} from "../data/mockData.js";

function PostDetailPage() {
  const { postId } = useParams();

  const post = mockPosts.find(
    (post) => post.id === Number(postId),
  );

  if (!post) {
    return (
      <>
        <Header currentUser={currentUser} />

        <main className="detail-shell container-inner">
          <h1>게시물을 찾을 수 없습니다.</h1>

          <Link className="back-link" to="/">
            ← 피드로 돌아가기
          </Link>
        </main>
      </>
    );
  }
  return (
    <>
      <Header currentUser={currentUser} />

      <main className="detail-shell container-inner">
        <Link className="back-link" to="/">
          ← 피드로 돌아가기
        </Link>

        <PostDetail
          post={post}
          isMyPost={post.author.id === currentUser.id}
        />

        <CommentSection
          comments={post.comments ?? []}
          commentCount={post.commentCount}
        />
      </main>
    </>
  );
}

export default PostDetailPage;
