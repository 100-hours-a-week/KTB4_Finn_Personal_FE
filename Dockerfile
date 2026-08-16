# 1단계: Node.js에서 React 빌드
FROM node:22-alpine AS builder

WORKDIR /app

# 의존성 파일을 먼저 복사하여 설치
COPY package.json package-lock.json ./
RUN npm ci

# React 소스 복사
COPY . .

ARG VITE_API_BASE_URL
ARG VITE_KAKAO_MAP_API_KEY

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_KAKAO_MAP_API_KEY=${VITE_KAKAO_MAP_APP_KEY}

# dist 디렉터리 생성
RUN npm run build


# 2단계: Nginx에서 React 실행
FROM nginx:alpine

# 기본 Nginx 설정을 프로젝트 설정으로 교체
COPY nginx.conf /etc/nginx/conf.d/default.conf

# React 빌드 결과물만 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
