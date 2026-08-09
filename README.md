# FOCAL Frontend

사진과 장소, 해시태그로 일상의 장면을 기록하고 탐색하는 커뮤니티 서비스 **FOCAL**의 프론트엔드입니다. 사용자는 사진에 태그와 장소를 더해 기록을 남기고, 최신·인기 피드와 해시태그·기간 검색으로 다른 사람의 시선을 발견할 수 있습니다.

## 프로젝트 개요

| 항목 | 내용 |
| --- | --- |
| 개발 기간 | 2026.06.17 ~ 2026.08.09 |
| Frontend | [KTB4_Finn_Personal_FE](https://github.com/100-hours-a-week/KTB4_Finn_Personal_FE) |
| Backend | [KTB4_Finn_Personal_BE](https://github.com/100-hours-a-week/KTB4_Finn_Personal_BE) |

### 기술 스택

| 영역 | 기술 | 사용 목적 |
| --- | --- | --- |
| UI | React 19 | 컴포넌트 기반 화면 구성과 상태 관리 |
| Routing | React Router 7 | 페이지 라우팅과 화면 간 상태 전달 |
| Language | JavaScript, JSX | UI와 사용자 상호작용 구현 |
| State | Context API | 로그인 사용자 정보를 라우트 하위에서 공유 |
| Network | Fetch API | 공통 인증·재시도 처리를 포함한 API 통신 |
| Build | Vite 8 | 개발 서버와 프로덕션 번들 생성 |
| Map | Kakao Maps JavaScript SDK | 장소 키워드 검색과 지도·마커 표시 |
| Styling | CSS | 화면 영역별 스타일과 반응형 레이아웃 구성 |
| Infra | Nginx, Docker | SPA 라우팅, API 프록시와 정적 파일 배포 |
| CI/CD | GitHub Actions, Docker Hub | 빌드 검증, 멀티 아키텍처 이미지 생성과 배포 |

### 주요 설계

- 페이지를 인증, 피드, 게시글, 댓글, 장소, 사용자 설정 단위의 컴포넌트로 분리했습니다.
- 페이지가 서버 데이터와 작업 상태를 소유하고, 하위 컴포넌트에는 Props와 이벤트 콜백을 전달하는 단방향 흐름을 사용했습니다.
- 공통 `apiFetch`에서 인증 헤더, JSON·FormData 요청, 204 응답, 오류 변환과 Access Token 재발급을 처리합니다.
- Kakao Maps SDK는 필요한 화면에서 비동기로 불러오며, 동일한 로딩 Promise를 공유해 중복 요청을 방지합니다.

## 실행 방법

### 요구 환경

- Node.js 22
- npm

### 환경 변수

프로젝트 루트의 실행 환경 파일에 다음 값을 설정합니다. 실제 API 주소와 Kakao 앱 키는 저장소 문서에 노출하지 않습니다.

```dotenv
VITE_API_BASE_URL=<backend-api-base-url>
VITE_KAKAO_MAP_APP_KEY=<kakao-javascript-app-key>
```

```bash
npm ci
npm run dev
```

프로덕션 빌드는 다음 명령으로 확인합니다.

```bash
npm run build
npm run preview
```

## 패키지 트리

```text
src/
├── api/          # 도메인별 API 요청과 공통 인증·재시도 처리
├── assets/       # 이미지와 SVG 아이콘
├── components/   # 기능·도메인별 UI 컴포넌트
├── context/      # 로그인 사용자 전역 상태
├── css/          # 화면 영역별 스타일
├── data/         # 추천 태그와 촬영 주제 데이터
├── lib/          # Kakao Maps SDK 로더
├── pages/        # 라우트 단위 페이지와 서버 상태 관리
├── utils/        # 날짜·비밀번호·장소 데이터 변환
├── App.jsx       # 라우팅과 사용자 레이아웃
└── main.jsx      # 애플리케이션 진입점
```

`components`는 인증, 피드, 게시글, 댓글, 장소, 사용자 설정, 공통 UI로 분리했습니다. 서버 요청과 작업 상태는 주로 `pages`에서 관리하고, 하위 컴포넌트는 전달받은 데이터 렌더링과 사용자 이벤트 전달에 집중합니다.

## 서비스 화면

### 인증과 계정 관리

<table>
  <tr>
    <th width="50%">로그인</th>
    <th width="50%">회원가입</th>
  </tr>
  <tr>
    <td><img src="./screenshot/user/login.png" alt="FOCAL 로그인 화면" /></td>
    <td><img src="./screenshot/user/signup.png" alt="FOCAL 회원가입 화면" /></td>
  </tr>
  <tr>
    <td>이메일과 비밀번호로 서비스에 진입합니다. 인증 실패 메시지와 제출 중 상태를 구분해 중복 요청을 막습니다.</td>
    <td>프로필 이미지, 닉네임, 이메일과 비밀번호를 검증합니다. 가입 완료 후 로그인 화면에서 완료 메시지를 제공합니다.</td>
  </tr>
</table>

<table>
  <tr>
    <th width="50%">프로필 관리</th>
    <th width="50%">비밀번호 변경</th>
  </tr>
  <tr>
    <td><img src="./screenshot/user/user-detail-profile.png" alt="FOCAL 프로필 편집 화면" /></td>
    <td><img src="./screenshot/user/user-detail-password.png" alt="FOCAL 비밀번호 변경 화면" /></td>
  </tr>
  <tr>
    <td>프로필 이미지와 닉네임을 변경하며, 변경된 사용자 정보는 Context에도 반영해 헤더와 설정 화면을 동기화합니다.</td>
    <td>현재 비밀번호와 새 비밀번호를 분리해 입력받고 확인 값까지 클라이언트에서 검증한 뒤 변경 요청을 보냅니다.</td>
  </tr>
</table>

<p align="center">
  <strong>회원 탈퇴 확인</strong><br />
  <img src="./screenshot/user/user-withdraw.png" alt="FOCAL 회원 탈퇴 확인 모달" width="70%" />
</p>

회원 탈퇴처럼 되돌리기 어려운 작업은 확인 모달을 한 번 더 거치게 하고, 처리 중에는 모달과 버튼의 중복 실행을 차단합니다.

### 피드 탐색

<table>
  <tr>
    <th width="50%">최신 장면</th>
    <th width="50%">인기 기록</th>
  </tr>
  <tr>
    <td><img src="./screenshot/feed/home.png" alt="FOCAL 최신 피드 화면" /></td>
    <td><img src="./screenshot/feed/home-popular.png" alt="FOCAL 인기 피드 화면" /></td>
  </tr>
  <tr>
    <td>최근 등록된 사진 기록을 최신순으로 탐색합니다. 작성자, 장소, 이미지, 태그와 반응 정보를 하나의 카드로 구성했습니다.</td>
    <td>인기 기록 메뉴에서 좋아요 수가 높은 장면을 확인할 수 있으며, 메뉴 변경 시 피드를 다시 불러옵니다.</td>
  </tr>
</table>

<table>
  <tr>
    <th width="50%">해시태그 검색</th>
    <th width="50%">검색 결과</th>
  </tr>
  <tr>
    <td><img src="./screenshot/feed/home-search.png" alt="FOCAL 해시태그 검색 화면" /></td>
    <td><img src="./screenshot/feed/home-search-result.png" alt="FOCAL 해시태그 검색 결과 화면" /></td>
  </tr>
  <tr>
    <td>검색 패널을 펼쳐 관심 있는 해시태그를 입력합니다.</td>
    <td>검색 중에는 버튼 상태를 변경하고, 응답이 완료되면 동일한 피드 카드 구조에 결과를 반영합니다.</td>
  </tr>
</table>

<table>
  <tr>
    <th width="50%">기간 직접 설정</th>
    <th width="50%">기간 검색 결과</th>
  </tr>
  <tr>
    <td><img src="./screenshot/feed/feed-search-range.png" alt="FOCAL 해시태그 기간 검색 화면" /></td>
    <td><img src="./screenshot/feed/feed-search-range-result.png" alt="FOCAL 해시태그 기간 검색 결과 화면" /></td>
  </tr>
  <tr>
    <td>오늘·이번 주·이번 달 프리셋과 사용자 지정 시작일·종료일을 제공하며, 잘못된 날짜 범위는 입력 단계에서 제한합니다.</td>
    <td>해시태그와 날짜 범위를 함께 전달해 해당 기간의 장면만 최신순으로 탐색할 수 있습니다.</td>
  </tr>
</table>

### 기록 작성과 장소 연결

<table>
  <tr>
    <th width="50%">새 기록 작성</th>
    <th width="50%">장소 검색과 지도 미리보기</th>
  </tr>
  <tr>
    <td><img src="./screenshot/feed/feed-create.png" alt="FOCAL 게시글 작성 화면" /></td>
    <td><img src="./screenshot/feed/feed-create-location-list.png" alt="FOCAL 장소 검색 결과와 지도 화면" /></td>
  </tr>
  <tr>
    <td>제목·설명·사진을 입력하고 쉼표 또는 Enter로 최대 5개의 태그를 추가합니다. 이미지 형식과 10MB 크기를 업로드 전에 확인합니다.</td>
    <td>Kakao 장소 키워드 검색 결과를 최대 5개까지 보여주고, 선택 전후의 위치를 지도와 마커로 미리 확인합니다.</td>
  </tr>
</table>

선택한 이미지는 Object URL로 즉시 미리 보여주며, 장소는 선택 사항으로 유지합니다. 전송 시 Kakao 검색 결과를 백엔드 장소 요청 형식으로 변환합니다.

### 상세 조회와 상호작용

<table>
  <tr>
    <th width="50%">게시글 상세</th>
    <th width="50%">위치 정보</th>
  </tr>
  <tr>
    <td><img src="./screenshot/feed/feed-detail.png" alt="FOCAL 게시글 상세 화면" /></td>
    <td><img src="./screenshot/feed/feed-detail-location.png" alt="FOCAL 게시글 위치 정보 화면" /></td>
  </tr>
  <tr>
    <td>사진과 본문, 태그, 좋아요·조회수 정보를 확인합니다. 작성자에게만 게시글 수정·삭제 동작을 제공합니다.</td>
    <td>장소가 있는 게시글은 위치 영역을 펼쳐 지도와 마커를 확인할 수 있고, 필요하지 않을 때는 접어 콘텐츠에 집중합니다.</td>
  </tr>
</table>

<table>
  <tr>
    <th width="50%">댓글 작성</th>
    <th width="50%">댓글 인라인 수정</th>
  </tr>
  <tr>
    <td><img src="./screenshot/feed/feed-detail-comment.png" alt="FOCAL 댓글 작성 화면" /></td>
    <td><img src="./screenshot/feed/feed-detail-comment-update.png" alt="FOCAL 댓글 수정 화면" /></td>
  </tr>
  <tr>
    <td>게시글 상세에서 댓글을 작성하고, 요청 완료 후 댓글 목록을 다시 불러와 서버 상태와 화면을 맞춥니다.</td>
    <td>작성한 댓글을 같은 위치에서 수정할 수 있습니다. </td>
  </tr>
</table>

<table>
  <tr>
    <th width="50%">댓글 삭제 확인</th>
    <th width="50%">게시글 삭제 확인</th>
  </tr>
  <tr>
    <td><img src="./screenshot/feed/feed-detail-comment-delete.png" alt="FOCAL 댓글 삭제 확인 모달" /></td>
    <td><img src="./screenshot/feed/feed-detail-delete.png" alt="FOCAL 게시글 삭제 확인 모달" /></td>
  </tr>
  <tr>
    <td>댓글 작성자에게만 수정·삭제 도구를 제공하고, 삭제 전에 대상과 동작을 다시 확인합니다.</td>
    <td>게시글 삭제 전 확인 모달을 표시하고, 완료되면 이전 상세 화면을 남기지 않도록 피드로 이동합니다.</td>
  </tr>
</table>

좋아요 요청 중에는 버튼을 비활성화하고 서버가 반환한 `isLiked`, `likeCount`로 화면을 갱신해 빠른 연속 클릭과 상태 불일치를 줄였습니다.

## 트러블슈팅

### 1. 동시 401 응답으로 인한 토큰 재발급 중복

**문제**

Access Token이 만료된 시점에 사용자 정보와 피드처럼 여러 요청이 함께 실행되면 각 요청이 동시에 Refresh API를 호출할 수 있었습니다. 이 경우 토큰 회전과 저장 순서가 엇갈리고 불필요한 네트워크 요청이 발생할 수 있습니다.

**원인**

각 API 요청이 자신의 401 응답만 보고 독립적으로 토큰을 재발급하면, 이미 진행 중인 재발급 요청이 있는지 알 수 없습니다.

**해결**

```js
// 응답 처리 부분을 생략한 핵심 구조
let refreshTokenPromise = null;

async function refreshAccessToken() {
  if (!refreshTokenPromise) {
    refreshTokenPromise = fetch(`${API_BASE_URL}/users/token/refresh`, {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      refreshTokenPromise = null;
    });
  }

  return refreshTokenPromise;
}
```

- 모듈 범위의 `refreshTokenPromise`로 진행 중인 재발급 요청을 공유했습니다.
- 동시에 401을 받은 요청은 같은 Promise를 기다린 후 새 Access Token으로 원 요청을 한 번만 재시도합니다.
- `hasRetried` 플래그로 재시도 횟수를 제한하고, 재발급도 실패하면 토큰을 제거한 뒤 로그인 화면으로 이동합니다.
- 로그인 실패에서 불필요한 토큰 갱신이 일어나지 않도록 로그인 API는 `retryOnUnauthorized: false`로 호출합니다.

**결과와 배운 점**

토큰 갱신을 단일 요청으로 합쳐 경쟁 상태를 줄였습니다. 인증 처리는 개별 화면보다 공통 네트워크 계층에서 일관되게 관리해야 한다는 점을 배웠습니다.

### 2. Kakao Maps SDK 중복 로드와 장소 검색 응답 순서

**문제**

작성 폼과 상세 화면이 각각 지도를 사용하므로 컴포넌트가 마운트될 때마다 SDK `<script>`가 중복 삽입될 수 있었습니다. 또한 사용자가 검색어를 연속해서 바꾸면 먼저 요청한 검색이 나중에 도착해 최신 결과를 덮어쓸 수 있었습니다.

**원인**

외부 SDK 로딩과 콜백 기반 장소 검색은 React 컴포넌트의 렌더링 순서와 독립적으로 완료됩니다. 로딩 상태와 요청 순서를 공유하지 않으면 중복 실행과 오래된 응답 반영이 발생합니다.

**해결**

- `kakaoMapSdkPromise`를 모듈 범위에 저장하고 이미 로드된 SDK와 기존 `<script>`를 먼저 확인했습니다.
- 로딩 중인 컴포넌트는 새 스크립트를 만들지 않고 동일한 Promise를 기다립니다.
- 로딩 실패 시 캐시한 Promise를 초기화해 다음 요청에서 다시 시도할 수 있게 했습니다.
- 장소 검색마다 `searchRequestRef`의 ID를 증가시키고, 가장 최근 요청 ID와 다른 콜백 결과는 무시했습니다.
- SDK 오류, 검색 결과 없음, 일반 검색 오류를 구분해 사용자에게 다른 메시지를 보여줍니다.

**결과와 배운 점**

외부 SDK를 한 번만 로드하면서도 여러 지도 컴포넌트가 안전하게 공유할 수 있게 됐습니다. 비동기 요청은 성공 여부뿐 아니라 **어떤 요청의 응답인지**까지 확인해야 한다는 점을 체감했습니다.

### 3. 작성 화면과 수정 화면의 장소 필드 계약 불일치

**문제**

새 게시글에서 선택한 장소는 정상적으로 전송됐지만, 기존 게시글을 수정할 때 장소 식별자가 누락될 수 있었습니다.

**원인**

Kakao 검색 결과를 정규화한 프론트엔드 모델은 `placeId`를 사용하고, 서버에서 다시 받은 게시글 장소는 `providerPlaceId`를 사용했습니다. 작성과 수정 화면이 같은 폼을 공유하면서도 한쪽 필드만 읽고 있었습니다.

**해결**

```js
providerPlaceId: location.placeId || location.providerPlaceId
```

폼 제출 경계에서 입력 출처에 따라 달라지는 두 값을 하나의 API 필드로 정규화했습니다. 나머지 장소 필드도 `placeName`, `roadAddressName`, `latitude`, `longitude` 계약에 맞춰 명시적으로 변환했습니다.

**결과와 배운 점**

작성과 수정 모두 같은 요청 구조를 사용하게 됐습니다. 화면에서 값이 보이는지만 확인할 것이 아니라 서버에서 받은 데이터를 다시 전송하는 수정 흐름까지 검증해야 함을 배웠습니다.

### 4. 이미지 미리보기 리소스 관리

**문제**

사용자가 게시글 이미지를 여러 번 교체하면 브라우저가 생성한 Object URL이 계속 남아 메모리를 점유할 수 있습니다. 잘못된 파일을 선택한 뒤 서버에서 거절되면 불필요한 업로드 요청도 발생합니다.

**원인**

`URL.createObjectURL()`로 만든 임시 URL은 브라우저가 자동으로 즉시 해제하지 않습니다. 컴포넌트가 미리보기의 생명주기를 직접 관리해야 합니다.

**해결**

- 선택 파일이 이미지 형식인지, 10MB 이하인지 업로드 전에 확인했습니다.
- 이미지가 변경되거나 컴포넌트가 해제될 때 이전 미리보기 URL에 `URL.revokeObjectURL()`을 호출했습니다.
- 수정 화면의 기존 서버 URL과 새 Object URL을 `isObjectUrl`로 구분해 서버 이미지 URL을 잘못 해제하지 않도록 했습니다.

**결과와 배운 점**

즉시 미리보기 경험을 유지하면서 임시 브라우저 리소스를 정리하고 불필요한 업로드를 줄였습니다. 브라우저 API로 생성한 리소스도 React 상태의 생명주기와 함께 관리해야 합니다.

## 프로젝트 후기

정적인 UI를 먼저 역할별 컴포넌트로 나누고, 상호작용에 꼭 필요한 State만 가장 가까운 공통 부모에 두는 방식으로 구현했습니다. 페이지가 데이터를 가져오고 하위 컴포넌트는 Props와 이벤트 콜백으로 연결되도록 구성하면서 React의 단방향 데이터 흐름을 실제 서비스 화면에 적용할 수 있었습니다.

API 연동을 진행하며 화면별 `fetch` 작성보다 공통 네트워크 계층의 중요성을 배웠습니다. 인증 헤더, FormData, 204 응답, 공통 오류와 토큰 재발급을 `apiFetch`로 모으자 각 화면은 사용자 동작과 상태 표현에 집중할 수 있었습니다.

Kakao Maps SDK처럼 React 외부에서 동작하는 비동기 도구를 연결할 때는 단순 로딩뿐 아니라 중복 초기화, 오래된 응답, 컴포넌트 해제 이후의 처리까지 고려해야 했습니다. 또한 장소 필드 불일치 문제를 해결하면서 프론트엔드 모델과 백엔드 DTO의 계약을 경계에서 명확하게 변환하고 작성·수정 흐름을 함께 검증해야 한다는 점을 배웠습니다.

### 다음 개선

추가 필요...
