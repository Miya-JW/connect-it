import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { updateUserInfo } from '../../services/serverServies/userProfileService';


const TagCard =({user})=>{
    const userId = user.user_id;
    const [editMode, setEditMode] = useState(false);
    const [newTag, setNewTag] = useState({
        user_tag:user.user_tag||''
    });

    const handleInputChange = (type, value) => {
        setNewTag(prevState => ({
            ...prevState,
            [type]: value
        }));
    };

    const handleUpdateTag = async () => {
        try {
            const response = await updateUserInfo(userId, newTag);
            console.log('User Information succsessfully updated', response);
            setEditMode(false); // 关闭编辑模式
        } catch (error) {
            console.log(error.message);
        }
    };


    return(
        <Card className='tagContainer card-text'>
        <Card.Body style={{padding:'0',margin:'0'}}>
            {editMode ? (
                <Form.Group>
                    <Form.Label>Tag:</Form.Label>
                    <Form.Control
                        type="text"
                        value={newTag.user_tag}
                        onChange={(e) => handleInputChange("user_tag",e.target.value)}
                    />
                    <Button variant="primary" onClick={handleUpdateTag} style={{ marginTop: '10px' }}>
                        更新标签
                    </Button>
                    <Button variant="secondary" onClick={() => setEditMode(false)} style={{ marginTop: '10px' }}>
                        取消
                    </Button>
                </Form.Group>
            ) : (
                <>
                    <Card.Text>
                        Tags: {user.user_tag || '无'}
                    </Card.Text>
                    <Button variant="primary" onClick={() => setEditMode(true)}>
                        添加/修改标签
                    </Button>
                </>
            )}
        </Card.Body>
    </Card>
    )
}

export default TagCard;