import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StatusBtn from '../buttons/StatusBtn';
import { getMovieStatus } from '../../services/serverServies/movieService'
import { Button } from 'react-bootstrap';


const MovieCard = ({ results }) => {
    const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId
    const [movieStatus, setMovieStatus] = useState({});
    const [expandedId, setExpandedId] = useState(null); // 用于追踪展开的摘要
    const toggleSummary = (id) => {
        setExpandedId(expandedId === id ? null : id); // 切换展开/收起
    };

    useEffect(() => {
        const fetchMovieStatus = async () => {
            if (userId && results.length) {
                try {

                    const responses = await getMovieStatus(userId);
                    const statuses = responses.data

                    const statusMap = statuses.reduce((acc, status) => {
                        acc[status.movie_id] = { user_id: userId, movie_id: status.movie_id, movie_status: status.movie_status };
                        return acc;
                    }, {});

                    // 为每个专辑设置状态，如果不存在则设为空
                    const finalStatus = results.reduce((acc, movie) => {
                        acc[movie.movie_id] = statusMap[movie.movie_id] || { user_id: userId, movie_id: movie.movie_id, movie_status: "" };
                        return acc;
                    }, {});

                    setMovieStatus(finalStatus);

                } catch (error) {
                    console.error('获取专辑状态失败:', error);
                }
            }
        };

        fetchMovieStatus();
    }, [userId, results]); // 当 userId 或 results 更新时重新执行

    const handleStatusChange = (movie_id, nextStatus) => {

        setMovieStatus(prev => ({
            ...prev,
            [movie_id]: { "user_id": userId, "movie_id": movie_id, "movie_status": nextStatus } // 正确引用和更新特定专辑的状态
        }));
    };

    const scrollLeft = () => {
        const container = document.getElementById('movieCards');
        container.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        const container = document.getElementById('movieCards');
        container.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (

        <div className="movieCardsContainer">
            <button onClick={scrollLeft} className="scrollButtonL scrollButton">Left</button>
            <div className="movieCards" id="movieCards">
                {results.map(item => (
                    <div className="movieCardOut" key={item.movie_id}>
                        <div className="movieCard">

                            <img className="movieImg" src={item.movie_poster} alt="movie Cover" style={{width:'290px',height:'auto'}} />

                            <div className="movieText">
                                <div className="movieTitle">{item.movie_title}</div>
                                <StatusBtn user_id={userId} targetType={'movie'} targetId={item.movie_id} currentStatus={movieStatus[item.movie_id]?.movie_status} onStatusChange={handleStatusChange} />
                               
                                <div className="movieDate">Release Date: {new Date(item.movie_date).toLocaleDateString()}</div>
                                <div className="movieTracks">Rate: {item.movie_rating}</div>
                                <div className='movieSummary'>
                                    Summary: {expandedId === item.movie_id ? item.movie_summary : `...`}
                                    <Button  variant="link" onClick={() => toggleSummary(item.movie_id)}>
                                        {expandedId === item.movie_id ? 'Show Less' : 'Show More'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={scrollRight} className="scrollButtonR scrollButton">Right</button>
        </div>
    )
}

export default MovieCard;