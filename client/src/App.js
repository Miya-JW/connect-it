import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserHomePage from './pages/UserHomePage';
import UserProfile from './pages/UserProfile';
import UserPage from './pages/UserPage';
import BookPage from './pages/BookPage';
import MoviePage from './pages/MoviePage';
import MusicPage from './pages/MusicPage';
import PlacePage from './pages/PlacePage';
import PhotoAlbumPage from './pages/PhotoAlbumPage';
import TopicPage from './pages/TopicPage';
import BlogPage from './pages/BlogPage';
import SearchResultsPage from './pages/SearchResuletsPage';


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="/user/home" element={<UserHomePage/>} />
           <Route path="/user/profile" element={<UserProfile/>} />
          <Route path="/user/:user_id" element={<UserPage/>} />
          <Route path="/book" element={<BookPage/>} />
          <Route path="/movie" element={<MoviePage/>} />
          <Route path="/music" element={<MusicPage/>} />
          <Route path="/place" element={<PlacePage/>} />
          <Route path="/album" element={<PhotoAlbumPage/>} />
          <Route path="/topic" element={<TopicPage/>} />
          <Route path="/blog" element={<BlogPage/>} />
          <Route path="/search_results/:type" element={<SearchResultsPage />} />
         
    </Routes>
    </Router>
  );
}

export default App;
