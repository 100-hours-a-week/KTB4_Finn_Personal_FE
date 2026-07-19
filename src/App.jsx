import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import ProfileEditPage from "./pages/ProfileEditPage.jsx";
import CreatePostForm from "./pages/CreatePostForm.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/settings/profile"
        element={<ProfileEditPage />}
      />

      <Route
        path="/posts/new"
        element={<CreatePostForm />} 
      />

      <Route
        path="/posts/:postId"
        element={<PostDetailPage />}
      />
      
    </Routes>
  );
}

export default App;