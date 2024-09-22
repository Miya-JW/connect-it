import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { updateAlbumStatus, deleteAlbumStatus } from '../../services/serverServies/albumsService'; // 确保路径和方法名正确

const StatusBtn = ({ user_id, targetId, currentStatus, onStatusChange }) => {
    const [status, setStatus] = useState('Set Status'); // 如果没有当前状态，默认为 "to listen"
    useEffect(() => {
        if (currentStatus) {
            setStatus(currentStatus); // 如果有当前状态传入，则更新状态
        }
    }, [currentStatus]); // 依赖于 currentStatus 的变化


    const handleStatusChange = async (newStatus) => {
        if (newStatus === status) return; // 如果状态没有变化，不执行任何操作
        try {
            if (newStatus === 'delete') {
                await deleteAlbumStatus(user_id, targetId);
                setStatus('');
            } else {
                await updateAlbumStatus(user_id, targetId, newStatus); // 发送更新请求到服务器
                setStatus(newStatus); // 更新本地状态
            }

            onStatusChange(targetId, newStatus); // 通知父组件状态已更改
        } catch (error) {
            console.error('更新专辑状态失败:', error);
        }
    };

    return (
        <DropdownButton
            title={status.toUpperCase()} // 显示当前状态，并大写
            variant="outline-primary"
            id={`dropdown-status-button-${targetId}`}
            key={targetId}
        >
            <Dropdown.Item eventKey="to listen" onClick={() => handleStatusChange('to listen')}>To Listen</Dropdown.Item>
            <Dropdown.Item eventKey="listening" onClick={() => handleStatusChange('listening')}>Listening</Dropdown.Item>
            <Dropdown.Item eventKey="listened" onClick={() => handleStatusChange('listened')}>Listened</Dropdown.Item>
            <Dropdown.Item eventKey="delete" onClick={() => handleStatusChange('delete')}>Delete</Dropdown.Item>
        </DropdownButton>
    );
};

export default StatusBtn;