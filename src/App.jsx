import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx"
import HomePage from "./pages/Home.jsx";
import ProfileEditPage from "./pages/ProfileEditPage.jsx";
import PostFormPage from "./pages/PostFormPage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

function App() {
  return (
    <Routes>

      <Route path="/login" element={<LoginPage />}/>

      <Route path="/signup" element={<SignupPage/>}/>

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
      
    </Routes>
  );
}

export default App;