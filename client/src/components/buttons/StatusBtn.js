import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { updateAlbumStatus, deleteAlbumStatus } from '../../services/serverServies/albumsService'; // 确保路径和方法名正确
import { updateBookStatus,deleteBookStatus } from '../../services/serverServies/bookService';


const StatusBtn = ({ user_id, targetType, targetId, currentStatus, onStatusChange }) => {
   
    const [status, setStatus] = useState('Set Status');
    const bookStatus = ['to read', 'reading', 'read'];
    const albumStatus = ['to listen', 'listening', 'listened'];
    let statusForDiv;
    statusForDiv = albumStatus;
    statusForDiv = bookStatus;

    switch (targetType) {
        case 'book': statusForDiv = bookStatus;
            break;
        case 'album': statusForDiv = albumStatus;
            break;
        default:
            statusForDiv = 'unknownStatus'; // 可以设置一个默认值以防未知类型
            break;
    }

    useEffect(() => {
        if (currentStatus) {
            setStatus(currentStatus); // 如果有当前状态传入，则更新状态
        }
    }, [currentStatus]); // 依赖于 currentStatus 的变化


    const handleStatusChange = async (newStatus) => {
        if (newStatus === status) return; // 如果状态没有变化，不执行任何操作
        try {
            if (newStatus === 'delete') {
                switch (targetType) {
                    case 'book': await deleteBookStatus(user_id, targetId);
                        setStatus('');
                        break;
                    case 'album': await deleteAlbumStatus(user_id, targetId);
                        setStatus('');
                        break;
                    default: break;
                }

            } else {
                if (targetType === 'book') {
                    await updateBookStatus(user_id, targetId, newStatus); // 发送更新请求到服务器
                } else if (targetType === 'album') {

                    await updateAlbumStatus(user_id, targetId, newStatus); // 发送更新请求到服务器
                }
                setStatus(newStatus); // 更新本地状态
            }

            onStatusChange(targetId, newStatus); // 通知父组件状态已更改
        } catch (error) {
            console.error('更新专辑状态失败:', error);
        }
    };

    return (
        <div className='musicBtn'>
            <DropdownButton
                title={status.toUpperCase()} // 显示当前状态，并大写
                variant="outline-primary"
                id={`dropdown-status-button-${targetId}`}
                key={targetId}
            >
                <Dropdown.Item className='musicBtnOption' eventKey={`${statusForDiv[0]}`} onClick={() => handleStatusChange(statusForDiv[0])}>{statusForDiv[0].toUpperCase()}</Dropdown.Item>
                <Dropdown.Item className='musicBtnOption' eventKey={`${statusForDiv[1]}`} onClick={() => handleStatusChange(statusForDiv[1])}>{statusForDiv[1].toUpperCase()}</Dropdown.Item>
                <Dropdown.Item className='musicBtnOption' eventKey={`${statusForDiv[2]}`} onClick={() => handleStatusChange(statusForDiv[2])}>{statusForDiv[2].toUpperCase()}</Dropdown.Item>
                <Dropdown.Item className='musicBtnOption' eventKey="delete" onClick={() => handleStatusChange('delete')}>Delete</Dropdown.Item>
            </DropdownButton>
        </div>
    );
};

export default StatusBtn;