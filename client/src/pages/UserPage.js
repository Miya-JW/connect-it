import React, { useEffect, useState } from 'react';
import Header from "../components/Header";

import MusicArtistsCard from '../components/cards/MusicArtistsCard';
import MusicAlbumCard from '../components/cards/MusicAlbumCard';
import UserInfoCard from '../components/cards/UserInfoCard';
import BlogCard from '../components/cards/BlogCard';
import BookCard from '../components/cards/BookCard';
import MovieCard from '../components/cards/MovieCard'

import { getFollowedArtists } from '../services/serverServies/userArtistService';
import { getAlbumStatus } from '../services/serverServies/albumsService';
import { getBookStatus } from '../services/serverServies/bookService';
import { getMovieStatus } from '../services/serverServies/movieService';
import { getFollowedUsers, getUser } from '../services/serverServies/userActivityService';
import { getBlogs } from '../services/serverServies/blogService';




const UserPage = ({ userId }) => {
    const [user, setUser] = useState([]);
    const [following, setFollowing] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [toListen, setToListen] = useState([]);
    const [listening, setListening] = useState([]);
    const [listened, setListened] = useState([]);
    const [toRead, setToRead] = useState([]);
    const [reading, setReading] = useState([]);
    const [read, setRead] = useState([]);
    const [toWatch, setToWatch] = useState([]);
    const [watching, setWatching] = useState([]);
    const [watched, setWatched] = useState([]);

    useEffect(() => {

        // 用户个人信息
        const fetchUser = async () => {
            if (!userId) {
                console.log('No user ID found');
                return;  // 如果 userId 未定义，直接返回
            }
            try {
                const user = await getUser(userId);
                setUser(user);
            } catch (error) {
                console.error('Failed to process artists:', error);
            }
        }

        // 关注名单
        const fetchFollowing = async () => {
            if (!userId) {
                console.log('No user ID found');
                return;  // 如果 userId 未定义，直接返回
            }
            try {
                const following = await getFollowedUsers(userId);

                const followingList = following.map(item => item.Following);
                setFollowing(followingList);  // 更新艺术家列表状态

            } catch (error) {
                console.error('Failed to process artists:', error);
            }
        };

        // blog
        const fetchBlogs = async () => {
            if (!userId) {
                console.log('No user ID found');
                return;  // 如果 userId 未定义，直接返回
            }
            try {
                const result = await getBlogs(userId);
                setBlogs(result);
            } catch (error) {
                console.error('Failed to process artists:', error);
            }
        }

        // 关注歌手
        const fetchArtists = async () => {
            if (!userId) {
                console.log('No user ID found');
                return;  // 如果 userId 未定义，直接返回
            }
            try {
                const followedArtists = await getFollowedArtists(userId);
                // 只提取每个条目中的 Artist 对象
                const artistList = followedArtists.map(item => item.Artist);
                setArtists(artistList);  // 更新艺术家列表状态
            } catch (error) {
                console.error('Failed to process artists:', error);
            }
        };

        // 专辑状态
        const fetchAlbums = async () => {
            if (!userId) {
                console.log('No user ID found');
                return;  // 如果 userId 未定义，直接返回
            }
            try {
                const response = await getAlbumStatus(userId);
                const userAlbums = response.data;

                const toListen = [];
                const listening = [];
                const listened = [];

                userAlbums.forEach(item => {
                    switch (item.album_status) {
                        case 'to listen':
                            toListen.push(item.Album);
                            break;
                        case 'listening':
                            listening.push(item.Album);
                            break;
                        case 'listened':
                            listened.push(item.Album);
                            break;
                        default:
                            // 如果状态未定义或不是预期的值，可以选择如何处理
                            break;
                    }
                });
                setToListen(toListen);
                setListening(listening);
                setListened(listened);
            } catch (error) {
                console.error('Failed to process albums:', error);
            }
        };

        // 阅读状态
        const fetchBooks = async () => {
            if (!userId) {
                console.log('No user ID found');
                return;  // 如果 userId 未定义，直接返回
            }
            try {
                const response = await getBookStatus(userId);
                const userBooks = response.data;

                const toRead = [];
                const reading = [];
                const read = [];

                userBooks.forEach(item => {
                    switch (item.book_status) {
                        case 'to read':
                            toRead.push(item.Book);
                            break;
                        case 'reading':
                            reading.push(item.Book);
                            break;
                        case 'read':
                            read.push(item.Book);
                            break;
                        default:
                            // 如果状态未定义或不是预期的值，可以选择如何处理
                            break;
                    }
                });
                setToRead(toRead);
                setReading(reading);
                setRead(read);
            } catch (error) {
                console.error('Failed to process books:', error);
            }
        };

        // 观影状态
        const fetchMoives = async () => {
            if (!userId) {
                console.log('No user ID found');
                return;  // 如果 userId 未定义，直接返回
            }
            try {
                const response = await getMovieStatus(userId);
                const userMovies = response.data;

                const toWatch = [];
                const watching = [];
                const watched = [];

                userMovies.forEach(item => {
                    switch (item.movie_status) {
                        case 'to watch':
                            toWatch.push(item.Movie);
                            break;
                        case 'watching':
                            watching.push(item.Movie);
                            break;
                        case 'watched':
                            watched.push(item.Movie);
                            break;
                        default:
                            // 如果状态未定义或不是预期的值，可以选择如何处理
                            break;
                    }
                });
                setToWatch(toWatch);
                setWatching(watching);
                setWatched(watched);
            } catch (error) {
                console.error('Failed to process movies:', error);
            }


        };

        fetchUser();
        fetchBlogs();
        fetchAlbums();
        fetchArtists();
        fetchFollowing();
        fetchBooks();
        fetchMoives();
    }, [userId]);

    return (
        <div>
            <Header />
            <div className='containerUserPage'>
                
                <div className="left-column">

                    <div className="UserCard">
                        <div className='header1'>User</div>
                        <div className='userInfo'>
                            <img className="rounded-circle"
                                variant="top"
                                src={`${process.env.REACT_APP_SERVER_URL}/uploads${user.user_avatar}` || 'https://via.placeholder.com/100'}
                                style={{ width: '100px', height: '100px', marginRight: '1rem' }} alt='userAvatar'
                            />
                            <div>
                                <div >{user.user_name}</div>
                                <div>Name: {`${user.user_first_name} ${user.user_last_name}` || 'Unknown'}</div>
                                <div>Join Date: {user.user_join_date ? new Date(user.user_join_date).toLocaleDateString() : 'Unknown'}</div>
                                <div>About: {user.user_about_me || 'None'}</div>
                                <div>Tags: {user.user_tag || ''}</div>
                            </div>
                        </div>
                    </div>

                    <div className='followingContainer'>
                        {following.length > 0 ? (<div>
                            <div className='header1'>Following</div>
                            <UserInfoCard results={following} />
                        </div>) : ''}
                    </div>

                </div>
                <div className="right-column">

                    <div className='blogContainer'>
                        {blogs.length > 0 ? (
                            <>
                                <div className='header1'>Blogs</div>
                                <BlogCard blogs={blogs} />
                            </>
                        ) : ''}
                    </div>

                    <div className='artistContainer'>
                        {artists.length > 0 ? (<div>
                            <div className='header1'>Followed Artists</div>
                            <MusicArtistsCard artists={artists} />
                        </div>) : ''}
                    </div>

                    <div className='albumContainer'>
                        {toListen.length > 0 ? (<div>
                            <div className='header1'>To Listen</div>
                            <MusicAlbumCard results={toListen} />
                        </div>) : ''}

                        {listening.length > 0 ? (<div>
                            <div className='header1'>Listening</div>
                            <MusicAlbumCard results={listening} />
                        </div>) : ''}

                        {listened.length > 0 ? (<div>
                            <div className='header1'>Listened</div>
                            <MusicAlbumCard results={listened} />
                        </div>) : ''}
                    </div>

                    <div className='bookContainer'>
                        {toRead.length > 0 ? (<div>
                            <div className='header1'>To Read</div>
                            <BookCard results={toRead} />
                        </div>) : ''}
                        {reading.length > 0 ? (<div>
                            <div className='header1'>Reading</div>
                            <BookCard results={reading} />
                        </div>) : ''}
                        {read.length > 0 ? (<div>
                            <div className='header1'>Read</div>
                            <BookCard results={read} />
                        </div>) : ''}
                    </div>

                    <div className='movieContainer'>
                        {toWatch.length > 0 ? (<div>
                            <div className='header1'>To Watch</div>
                            <MovieCard results={toWatch} />
                        </div>) : ''}
                        {watching.length > 0 ? (<div>
                            <div className='header1'>Watching</div>
                            <MovieCard results={watching} />
                        </div>) : ''}
                        {watched.length > 0 ? (<div>
                            <div className='header1'>Watched</div>
                            <MovieCard results={watched} />
                        </div>) : ''}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserPage;