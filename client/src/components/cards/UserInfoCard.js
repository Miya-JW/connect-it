import { React, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFollowedUsers } from '../../services/serverServies/userActivityService'
import UserFollowBtn from '../buttons/UserFollowBtn';
import { useNavigate } from 'react-router-dom';
// import TagCard from './TagCard';



const UserInfoCard = ({ results }) => {
    const navigate = useNavigate();
    const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId
    const [followedUsers, setFollowedUsers] = useState({});// 记录关注的状态
    const [detailExpandedId, setDetailExpandedId] = useState(null);
    const toggleDetail = (id) => {

        setDetailExpandedId(detailExpandedId === id ? null : id);

    }


    useEffect(() => {
        const fetchUsersAndFollowedStatus = async () => {
            try {
                const followed = await getFollowedUsers(userId);  // 获取当前用户已关注的用户列表
                const followedIds = results.reduce((acc, user) => {
                    // 检查每个艺术家是否被关注，不存在于 followed 数组中则设为 false
                    acc[user.user_id] = followed.some(f => f.following_id === user.user_id);
                    return acc;
                }, {});
                setFollowedUsers(followedIds);  // 更新关注状态
            } catch (error) {
                console.error('Failed to fetch users or followed status:', error);
            }
        };
        fetchUsersAndFollowedStatus();
    }, [userId, results]);  // 当 userId 更新时重新执行

    const handleStatusChange = (album_status, newFollowStatus) => {
        setFollowedUsers(prevState => ({
            ...prevState,
            [album_status]: newFollowStatus
        }));
    };


    const toOtherUserPage = (userId) => {
        navigate(`/other-user`, { state: { userId } });
    }
    return (
        <div className="UserInfoCard">

            {results.map((item) => (
                // <ListGroup.Item className="userCard" key={item.user_id}>

                    <div className='otherUserInfo'>
                        <Card.Img onClick={()=>toggleDetail(item.user_id)} className="rounded-circle"
                            variant="top"
                            src={`${process.env.REACT_APP_SERVER_URL}/uploads${item.user_avatar}` || 'https://via.placeholder.com/100'}
                            style={{ width: '150px', height: '150px', marginBottom:'5px' ,cursor:'pointer'}}
                        />

                       
                        {/* <button className="expandBtnUser" onClick={()=>toggleDetail(item.user_id)}>{detailExpandedId===item.user_id ? 'Show Less' : 'More Info'}</button> */}
                        <div className="userOtherInfo">
                            {detailExpandedId===item.user_id && (
                                <div>
                                     <div onClick={() => toOtherUserPage(item.user_id)} style={{color:'#f9f7f3',marginBottom:'20px',marginTop:'20px'}}>{item.user_name}</div>
                                    <Card.Text style={{color:'#f9f7f3'}}>Name: {`${item.user_first_name || ""} ${item.user_last_name || ""}` || 'Unknown'}</Card.Text>

                                    <Card.Text style={{color:'#f9f7f3'}}>Join Date: {item.user_join_date ? new Date(item.user_join_date).toLocaleDateString() : 'Unknown'}</Card.Text>
                                    <Card.Text style={{color:'#f9f7f3'}}>About: {item.user_about_me || 'None'}</Card.Text>
                                    {/* <Card.Text>Tags: {item.user_tag || ''}</Card.Text> */}
                                    {/* <TagCard user={item} /> */}
                                    <div onClick={() => toOtherUserPage(item.user_id)} style={{color:'#f9f7f3',marginBottom:'20px',marginTop:'20px',textDecoration: 'underline',cursor:'pointer'}}>Home Page</div>
                                    <UserFollowBtn
                                        follow_id={item.user_id}
                                        isFollowed={followedUsers[item.user_id]}
                                        userId={userId}
                                        onStatusChange={handleStatusChange}
                                    />
                                </div>
                            )}

                        </div>
                    </div>


                // </ListGroup.Item>
            ))}

        </div>
    )
}

export default UserInfoCard;