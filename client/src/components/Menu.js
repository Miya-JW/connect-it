import React, { useState, useEffect, useRef } from 'react';
import { createCurve } from '../utils/curve';
import { useNavigate } from 'react-router-dom'; // 使用 useNavigate
import '../styles/menu.css';

function Menu() {
    const navigate = useNavigate(); // 使用 useNavigate 钩子
    const pathMap = {
        home:'/',
        book: '/book',
        music: '/music',
        movie: '/movie',
        place: '/place',
        topic: '/topic',
        album: '/album',
        blog: '/blog',
        me:'/user/profile'
    };


    const dockerRef = useRef(null);
    const [scales, setScales] = useState(Array(12).fill(1));
    const lastUpdateTime = useRef(Date.now()); // 用于节流

    const handleMouseMove = (e) => {
        const now = Date.now();
        if (now - lastUpdateTime.current < 20) { // 约 50 fps
            return; // 如果间隔时间小于20毫秒，则不更新
        }
        lastUpdateTime.current = now;

        if (dockerRef.current) {
            const dockerRect = dockerRef.current.getBoundingClientRect();
            const range = 800;
            const maxScale = 2;
            const curve = createCurve(range, e.clientX - dockerRect.left, 1, maxScale);
            const children = dockerRef.current.querySelectorAll('.menu_item, .gap');
            const newScales = Array.from(children).map(child => {
                const rect = child.getBoundingClientRect();
                const x = rect.left + rect.width / 2 - dockerRect.left;
                return curve(x);
            });
            requestAnimationFrame(() => {
                setScales([...newScales]);
            });
        }
    };

    const handleClick = (itemName) => {
        const path = pathMap[itemName.toLowerCase()];
        if (path) {

            navigate(path);
        } else {
            console.error("No path for item:", itemName);
        }
    };


    useEffect(() => {
        const docker = dockerRef.current;
        if (docker) {
            docker.addEventListener('mousemove', handleMouseMove);
            docker.addEventListener('mouseleave', () => setScales(Array(16).fill(1)));
        }

        return () => {
            if (docker) {
                docker.removeEventListener('mousemove', handleMouseMove);
                docker.removeEventListener('mouseleave', () => setScales(Array(16).fill(1)));
            }
        };
    }, []);

    return (
        <div className='menuBar'>
        <div className='docker' ref={dockerRef}>
            <div className="menu">
                {["home","blog", "music", "movie", "book", "me"].flatMap((item, index) => (
                    <React.Fragment key={index}>
                        <div
                            className='menu_item'
                            style={{ '--i': scales[index * 2] || 1 }}
                            onClick={() => handleClick(`${item}`)}
                        >
                            {item.toUpperCase()}
                        </div>
                        <div
                            className='gap'
                            style={{ '--i': scales[index * 2 + 1] || 1 }}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Menu;



