import { Link, useParams } from "react-router-dom";

import Header from "../components/layout/Header.jsx";
import PostDetail from "../components/post/PostDetail.jsx";
import CommentSection from "../components/comment/CommentSection.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteComment, getCommentByPostId,registerComment, updateComment } from "../api/comment/comment.js";

import { useEffect } from "react";
import { deletePost, getPostDetail } from "../api/post/post.js";
import { getUserInfo } from "../api/user/user.js";

function PostDetailPage() {
  const { postId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [commentInfo, setCommentInfo] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await getUserInfo();
          setCurrentUser(response.data);
        } catch (error) {
          console.error("요청 실패:", error);
        }
      };

      fetchUserInfo();
    }, []);

  const navigate = useNavigate();
  
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

  useEffect(() => {
    const fetchPostInfo = async () => {
      try{
        setIsLoading(true);

        const postInfoResponse = await getPostDetail(Number(postId));
        setPost(postInfoResponse.data);

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

  if (isLoading) {
    return <p>게시물을 불러오는 중입니다...</p>;
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
