import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserProfile from './pages/UserProfilePage';
import UserPage from './pages/UserPage';
import BookPage from './pages/BookPage';
import MoviePage from './pages/MoviePage';
import MusicPage from './pages/MusicPage';
import BlogPage from './pages/BlogPage';
import SearchResultsPage from './pages/SearchResuletsPage';
import { useSelector } from 'react-redux';
import OtherUserPage from './pages/OtherUserPage';


function App() {
  const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId

  return (
    <Router>
      <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="/user/home" element={<UserPage userId={userId}/>} />
           <Route path="/user/profile" element={<UserProfile/>} />
          <Route path="/other-user" element={<OtherUserPage/>} />
          <Route path="/book" element={<BookPage/>} />
          <Route path="/movie" element={<MoviePage/>} />
          <Route path="/music" element={<MusicPage/>} />
          <Route path="/blog" element={<BlogPage/>} />
          <Route path="/search_results/:type" element={<SearchResultsPage />} />
         
    </Routes>
    </Router>
  );
}

export default App;
