// src/data/mockData.js


import postImage from "../assets/post_img.png";

export const currentUser = {
  id: 1,
  nickname: "정지호",
  email: "jiho1741@gmail.com",
  profileImageUrl: null,
  introduction: "빛이 머문 풍경을 천천히 기록합니다.",
};

export const mockPosts = [
  {
    id: 1,
    title: "비가 그친 뒤, 잠시 열린 하늘",
    description:
      "퇴근길에 마주친 겹겹의 구름과 산 능선. 짧은 순간이라 더 오래 바라봤어요.",
    imageUrl: postImage,
    createdAtLabel: "2시간 전",
    author: {
      id: 1,
      nickname: "정지호",
      profileImageUrl: null,
    },
    likeCount: 128,
    isLiked: false,
    commentCount: 1,
    tags: ["풍경", "노을", "오늘의빛"],
    comments: [
      {
        id: 1,
        content: "구름 사이의 빛이 정말 좋네요.",
        createdAtLabel: "1시간 전",
        author: {
          nickname: "소연",
          profileImageUrl: null,
        },
      },
    ],  
  },
  {
    id: 2,
    title: "여름 저녁의 온도",
    description:
      "천천히 어두워지는 시간, 오늘의 빛을 한 장 남겼습니다.",
    imageUrl: postImage,
    createdAtLabel: "4시간 전",
    author: {
      id: 2,
      nickname: "민서",
      profileImageUrl: null,
    },
    likeCount: 76,
    likedByMe: false,
    commentCount: 8,
    tags: ["일상", "풍경", "여름"],
  },
];

export const todayTopic = {
  title: "창문 너머의 빛",
  description:
    "창문을 통해 들어오는 오늘의 빛을 기록해보세요.",
};

export const recommendedTags = [
  "거리",
  "필름",
  "인물",
  "풍경",
  "야경",
  "일상의 빛",
];