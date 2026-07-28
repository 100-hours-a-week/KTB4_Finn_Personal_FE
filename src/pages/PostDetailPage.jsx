import { Link, useParams } from "react-router-dom";

import Header from "../components/layout/Header.jsx";
import PostDetail from "../components/post/PostDetail.jsx";
import CommentSection from "../components/comment/CommentSection.jsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteComment, getCommentByPostId,registerComment, updateComment } from "../api/comment/comment.js";

import { useEffect, useLayoutEffect } from "react";
import { deletePost, getPostDetail } from "../api/post/post.js";
import { UserInfoContext } from "../context/UserInfoContext.jsx";

function PostDetailPage() {
  const { postId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [commentInfo, setCommentInfo] = useState([]);

  const {currentUser} = useContext(UserInfoContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostInfo = async () => {
      try{
        setIsLoading(true);

        const postInfoResponse = await getPostDetail(Number(postId));
        setPost(postInfoResponse.data);

        console.log("post 정보 : ", postInfoResponse.data);
        const commentInfoResponse = await getCommentByPostId(Number(postId));
        setCommentInfo(commentInfoResponse.data.comments);

      }catch(error){
        console.log("게시물 요청 실패 : ", error);
      }finally{
        setIsLoading(false);
      }
    };
    fetchPostInfo();
  }, [postId]);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [postId]);
  
  const handleCreateComment = async (content) => {
    try{
      await registerComment({
        postId : Number(postId), 
        content
      });

      const response = await getCommentByPostId(Number(postId));
      setCommentInfo(response.data.comments);
      
    }catch(error){
      console.log("댓글 작성 실패 : ", error);
    }
  }
  const handleEditComment = async(commentId, content) => {
    try{
      await updateComment({
        commentId,
        content : content
      });
      const response = await getCommentByPostId(Number(postId));
      setCommentInfo(response.data.comments);
    }catch(error){
      console.log("댓글 수정 실패 : ", error);
      throw error;
    }
  }

  const handleDeleteComment = async(commentId) => {
    try{
      await deleteComment(commentId);
      const response = await getCommentByPostId(Number(postId));
      setCommentInfo(response.data.comments);
    }catch(error){
      console.log("댓글 삭제 실패 : ", error);
      throw error;
    }
  }

  const handleDeletePost = async () => {
    try {
      await deletePost(Number(postId));
      navigate("/", { replace: true });
    } catch (error) {
      console.log("게시물 삭제 실패 : ", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <>
        <Header currentUser={currentUser} />

        <main
          className="detail-shell container-inner"
          aria-busy="true"
          aria-label="게시물을 불러오는 중"
        >
          <Link className="back-link" to="/">
            ← 피드로 돌아가기
          </Link>

          <span className="sr-only" role="status">
            게시물을 불러오는 중입니다.
          </span>

          <article className="detail-skeleton" aria-hidden="true">
            <header className="detail-head">
              <div className="detail-author">
                <span className="skeleton skeleton-detail-avatar" />
                <div className="skeleton-author-copy">
                  <span className="skeleton skeleton-line skeleton-line-name" />
                  <span className="skeleton skeleton-line skeleton-line-meta" />
                </div>
              </div>
              <span className="skeleton skeleton-detail-button" />
            </header>

            <div className="skeleton skeleton-detail-photo" />
            <span className="skeleton skeleton-line skeleton-detail-title" />
            <div className="skeleton-detail-copy">
              <span className="skeleton skeleton-line" />
              <span className="skeleton skeleton-line" />
              <span className="skeleton skeleton-line skeleton-line-short" />
            </div>
            <div className="skeleton-detail-metrics">
              <span className="skeleton skeleton-action" />
              <span className="skeleton skeleton-action skeleton-action-wide" />
            </div>
          </article>

          <section className="comment-section detail-comment-skeleton" aria-hidden="true">
            <span className="skeleton skeleton-line skeleton-comment-title" />
            <div className="skeleton skeleton-comment-box" />
          </section>
        </main>
      </>
    );
  }


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
          isMyPost={post.isMine}
          onDelete={handleDeletePost}
        />

        <CommentSection
          commentsInfo={commentInfo}
          onCreateComment={handleCreateComment}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
        />
      </main>
    </>
  );
}

export default PostDetailPage;
