import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import BookImg from '../assets/images/book4.jpeg';
import MusicImg from '../assets/images/music4.jpg';
import MovieImg from '../assets/images/movie4.jpg';
import BlogImg from '../assets/images/blog3.jpeg';

const HomePage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 初始状态假设用户未登录

    useEffect(() => {
        const token = localStorage.getItem('authToken'); // 从本地存储获取令牌
        setIsLoggedIn(!!token); // 如果 token 存在，则认为已登录

        if (isLoggedIn) {
            navigate('/user/home'); // 如果用户已登录，导航到用户主页
        } else {
            navigate('/'); // 如果未登录，保持在当前页面或可以导航到任何公开页面
        }
    }, [isLoggedIn, navigate]); // 依赖数组包含 isLoggedIn 和 navigate

    const [chosenSlideNumber, setChosenSlideNumber] = useState(1);
    const [offset, setOffset] = useState(0);
    const [barOffset, setBarOffset] = useState(0);
    const [intervalID, setIntervalID] = useState(null);

    useEffect(() => {
        const startSlide = () => {
            const id = setInterval(() => {
                setChosenSlideNumber(prevNumber => {
                    const nextSlide = prevNumber % 4 + 1;
                    slideTo(nextSlide);
                    return nextSlide;
                });
            }, 3000); // 间隔时间设置为3000ms
            setIntervalID(id);
            return () => clearInterval(id); // 清理定时器
        };
        startSlide();
    }, []);

    const slideTo = (slideNumber) => {
        setChosenSlideNumber(slideNumber);
        setOffset((slideNumber - chosenSlideNumber) * (-100));
        setBarOffset((slideNumber - chosenSlideNumber) * 100);
    }

    const mouseenter = () => {
        clearInterval(intervalID);
    }

    const mouseleave = () => {
        const id = setInterval(() => {
            setChosenSlideNumber(prevNumber => {
                const nextSlide = prevNumber % 4 + 1;
                slideTo(nextSlide);
                return nextSlide;
            });
        }, 3000);
        setIntervalID(id);
    }

    return (
        <div className="singlePage homePage">
            <Header />
            <div className='homePageContainer'>
                <div className='homePageBody'>
                    <div id='main'>

                        <div id='click-section'>
                            <div id='drawerboxes'>
                                <div className={`drawerbox ${chosenSlideNumber === 1 ? 'active' : ''}`}>
                                    <button className='drawer-btn' onClick={() => slideTo(1)}>Blog</button>
                                    <span className='drawer-head'>1</span>
                                </div>

                                <div className={`drawerbox ${chosenSlideNumber === 2 ? 'active' : ''}`}>
                                    <button className='drawer-btn' onClick={() => slideTo(2)}>Music</button>
                                    <span className='drawer-head'>2</span>
                                </div>

                                <div className={`drawerbox ${chosenSlideNumber === 3 ? 'active' : ''}`}>
                                    <button className='drawer-btn' onClick={() => slideTo(3)}>Movie</button>
                                    <span className='drawer-head'>3</span>
                                </div>

                                <div className={`drawerbox ${chosenSlideNumber === 4 ? 'active' : ''}`}>
                                    <button className='drawer-btn' onClick={() => slideTo(4)}>Book</button>
                                    <span className='drawer-head'>4</span>
                                </div>
                            </div>
                        </div>

                        <div id='slide-section' onMouseEnter={mouseenter} onMouseLeave={mouseleave}>
                            <div id='slide-bar'>
                                <div id='bar' style={{ transform: `translateY(${barOffset}%)` }}></div>
                            </div>

                            <div id='card-section'>
                                <div id='card1' className={`card ${chosenSlideNumber === 1 ? 'active' : ''}`} style={{ transform: `translateY(${offset}%)` }}>
                                    <div className='card-small-title'>Embrace the slow lane with tales that unwind time.</div>
                                    <div className='card-title' onClick={()=>{navigate('./blog')}}>Blog</div>
                                    <div className='card-content'>
                                    Be the blogger you were born to be! Create new blogs and share your life’s quirks, tips, and epic fails with a world that desperately needs a good laugh. And when you’re not writing, take a sneak peek at other users’ blogs. It’s like legally spying on your neighbors through the internet’s keyhole—totally socially acceptable and way less creepy. Dive into the community and maybe even find your new favorite blogger!</div>
                                
                                    <div className='card-img'>
                                        <img src={BlogImg} alt='Blog'></img>
                                    </div>
                                </div>

                                <div id='card2' className={`card ${chosenSlideNumber === 2 ? 'active' : ''}`} style={{ transform: `translateY(${offset}%)` }}>
                                    <div className='card-small-title'>Tune into tranquility with melodies for slow living.</div>
                                    <div className='card-title' onClick={()=>{navigate('./music')}}>Music</div>
                                    <div className='card-content'>Welcome to your new musical playground! Dive into the latest albums, jam out with the most popular artists, and discover tunes that make your heart sing. Choose to follow your favorite singers and create your own playlists with tracks you’ve heard, are listening to, or can’t wait to hear. It’s like having a backstage pass to the best music show in town—without the crowd! So tune in, turn up the volume, and tailor your music experience to the rhythm of your own drum.</div>
                                    <div className='card-img'>
                                        <img src={MusicImg} alt='Music'></img>
                                    </div>
                                </div>

                                <div id='card3' className={`card ${chosenSlideNumber === 3 ? 'active' : ''}`} style={{ transform: `translateY(${offset}%)` }}>
                                    <div className='card-small-title'>Slow cinema for serene scenes.</div>
                                    <div className='card-title' onClick={()=>{navigate('./movie')}}>Movie</div>
                                    <div className='card-content'>Ready to turn your living room into the coolest cinema in town? Check out our selection of the latest and greatest movies that everyone’s talking about. Create your own movie lists with categories like ‘Watched’, ‘Want to Watch’, and ‘Watching’. It’s your personal guide to movie night—no ticket required! Whether you’re in the mood for a blockbuster hit or a quirky indie, our movie page is your go-to spot for all things film. So grab some popcorn, pick your spot on the couch, and start streaming your next favorite movie.</div>
                                    <div className='card-img'>
                                        <img src={MovieImg} alt='Movie'></img>
                                    </div>
                                </div>

                                <div id='card4' className={`card ${chosenSlideNumber === 4 ? 'active' : ''}`} style={{ transform: `translateY(${offset}%)` }}>
                                    <div className='card-small-title'>Turn the page slowly, savor the calm.</div>
                                    <div className='card-title' onClick={()=>{navigate('./book')}}>Book</div>
                                    <div className='card-content'>Calling all bookworms! Explore our curated shelves of book recommendations sorted just for you. Whether you’re into thrilling mysteries, heartwarming romances, or mind-bending sci-fi, we’ve got the book for you. Create your own reading lists with categories like ‘Want to Read’, ‘Currently Reading’, and ‘Read’. It’s like having a personal library at your fingertips—no late fees guaranteed! Dive into your next great adventure, learn something new, or escape to another world. Whatever your reading style, our book page is your cozy corner for all things literary. So settle in, pick a book, and let the pages turn themselves!</div>
                                    <div className='card-img'>
                                        <img src={BookImg} alt='Book'></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;