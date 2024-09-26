import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import StatusBtn from '../buttons/StatusBtn';
import { getAlbumStatus } from '../../services/serverServies/albumsService'
import '../../styles/Cards.css'


const MusicAlbumCard = ({ results }) => {
    const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId
    const [albumStatus, setAlbumStatus] = useState({});


    useEffect(() => {
        const fetchAlbumStatus = async () => {
            if (userId && results.length) {
                try {

                    const responses = await getAlbumStatus(userId);
                    const statuses = responses.data

                    const statusMap = statuses.reduce((acc, status) => {
                        acc[status.album_id] = { user_id: userId, album_id: status.album_id, album_status: status.album_status };
                        return acc;
                    }, {});

                    // 为每个专辑设置状态，如果不存在则设为空
                    const finalStatus = results.reduce((acc, album) => {
                        acc[album.album_id] = statusMap[album.album_id] || { user_id: userId, album_id: album.album_id, album_status: "" };
                        return acc;
                    }, {});

                    setAlbumStatus(finalStatus);

                } catch (error) {
                    console.error('获取专辑状态失败:', error);
                }
            }
        };

        fetchAlbumStatus();
    }, [userId, results]); // 当 userId 或 results 更新时重新执行

    const handleStatusChange = (album_id, nextStatus) => {

        setAlbumStatus(prev => ({
            ...prev,
            [album_id]: { "user_id": userId, "album_id": album_id, "album_status": nextStatus } // 正确引用和更新特定专辑的状态
        }));
        console.log(albumStatus);
    };

    console.log(results)
    const scrollLeft = () => {
        const container = document.getElementById('musicCards');
        container.scrollBy({ left: -300, behavior: 'smooth' });
    };
      
    const scrollRight = () => {
        const container = document.getElementById('musicCards');
        container.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        // <div className='musicCards '>
        //     <ListGroup >
              
        //             {results.map(item => (
        //                 // Card for Album

        //                 <ListGroup.Item key={item.album_id} className='musicCardOut '>
        //                     <Card className='musicCard '>
        //                         <Card.Body className='musicCard '>
        //                             <Card.Img className='musicImg' variant="top" src={item.album_image} />
        //                             <div className='musicText '>
        //                                 <Card.Text className=' musicTitle'>{item.album_title}</Card.Text>
        //                                 < StatusBtn user_id={userId} targetId={item.album_id} currentStatus={albumStatus[item.album_id]?.album_status} onStatusChange={handleStatusChange} />
        //                                 <Card.Text className=' musicArtist'>Artist: {item.album_artist_name}</Card.Text>
        //                                 <Card.Text className=' musicDate'>Release Date: {new Date(item.album_release_date).toLocaleDateString()}</Card.Text>
        //                                 <Card.Text className=' musicTracks'>Total Tracks: {item.album_total_tracks}</Card.Text>
        //                                 <Card.Link className='' href={item.album_spotifyUrl} target="_blank">Listen on Spotify</Card.Link>


        //                             </div>
        //                         </Card.Body>
        //                     </Card>
        //                 </ListGroup.Item>

        //             ))}
        //      <div className='button-prev'>left</div>
        //      <div className='button-next'>right</div>
        //     </ListGroup>

         

        // </div>
        <div className="musicCardsContainer">
        <button onClick={scrollLeft} className="scrollButtonL scrollButton">Left</button>
        <div className="musicCards" id="musicCards">
          {results.map(item => (
            <div className="musicCardOut" key={item.album_id}>
              <div className="musicCard">

                <img className="musicImg" src={item.album_image} alt="Album Cover" />
                
                <div className="musicText">
                  <div className="musicTitle">{item.album_title}</div>
                  <StatusBtn user_id={userId} targetId={item.album_id} currentStatus={albumStatus[item.album_id]?.album_status} onStatusChange={handleStatusChange} />
                  <div className="musicArtist">Artist: {item.album_artist_name}</div>
                  <div className="musicDate">Release Date: {new Date(item.album_release_date).toLocaleDateString()}</div>
                  <div className="musicTracks">Total Tracks: {item.album_total_tracks}</div>
                  <a href={item.album_spotifyUrl} >Listen on Spotify</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={scrollRight} className="scrollButtonR scrollButton">Right</button>
      </div>
    )
}

export default MusicAlbumCard;