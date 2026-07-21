import { Link, useParams } from "react-router-dom";

import Header from "../components/layout/Header.jsx";
import PostDetail from "../components/post/PostDetail.jsx";
import CommentSection from "../components/comment/CommentSection.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCommentByPostId,registerComment } from "../api/comment/comment.js";

import {
  currentUser,
  mockPosts,
} from "../data/mockData.js";
import { useEffect } from "react";
import { getPostDetail } from "../api/post/post.js";

function PostDetailPage() {
  const { postId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [commentInfo, setCommentInfo] = useState([]);

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
        />

        <CommentSection
          commentsInfo={commentInfo}
          onCreateComment={handleCreateComment}
        />
      </main>
    </>
  );
}

export default PostDetailPage;
