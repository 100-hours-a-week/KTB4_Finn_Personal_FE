import { Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx"
import HomePage from "./pages/Home.jsx";
import ProfileEditPage from "./pages/ProfileEditPage.jsx";
import PostFormPage from "./pages/PostFormPage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { UserInfoContext } from "./context/UserInfoContext.jsx";
import { useEffect, useMemo, useState } from "react";
import { getUserInfo } from "./api/user/user.js";

function UserLayout(){
  const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      let isMounted = true;

      async function fetchUser() {
        try{
          const response = await getUserInfo();
          
          if(isMounted){
            setCurrentUser(response.data);
          }
        }catch(error){
          console.error("사용자정보 요청 실패: ", error);
        }finally{
          if(isMounted){
            setIsLoading(false);
          }
        }
      }

      fetchUser();

      return () => {
        isMounted = false;
      };
    }, []);

    const contextValue = useMemo( () => ({currentUser, setCurrentUser}), [currentUser]);

    if (isLoading) {
      return <p>사용자 정보를 불러오는 중입니다...</p>;
    }

    return (
      <UserInfoContext.Provider value={contextValue}>
        {/* UserLayout의 자식 페이지가 렌더링되는 자리 */}
        <Outlet />
      </UserInfoContext.Provider>
    );
}

function App() {

  return (
    <Routes>

      <Route path="/login" element={<LoginPage />}/>

      <Route path="/signup" element={<SignupPage/>}/>


      <Route element={<UserLayout/>}>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/settings/profile"
          element={<ProfileEditPage />}
        />
          
        <Route
          path="/posts/new"
          element={<PostFormPage mode={"create"}/>} 
        />

        <Route 
          path="/posts/edit/:postId"
          element={<PostFormPage mode={"edit"}/>}
        />

        <Route
          path="/posts/:postId"
          element={<PostDetailPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;