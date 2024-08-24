import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import logo_img from '../assets/images/logo.jpg';


const API_BASE_URL = `http://localhost:3000`; // 这是后端服务器的基础URL

const AuthForm = () => {
    const navigate = useNavigate(); // 获取 navigate 函数
    const [isLoginView, setIsLoginView] = useState(true);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password_repeat: ''
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const showForm = urlParams.get("show");
        if (showForm === "register") {
            setIsLoginView(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/user/home');  // 如果已登录，直接导航到用户主页
        }
    }, [navigate]);

    //获得用户输入内容
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (!isLoginView) {
            if (name === 'username') {
                checkUsername(value);
            }

            if (name === 'password' || name === 'password_repeat') {
                const password = name === 'password' ? value : formData.password;
                const passwordRepeat = name === 'password_repeat' ? value : formData.password_repeat;
                checkPassword(password, passwordRepeat);
            }
        }

    };

    //-----------------------------用户注册--------------------------------------------
    //验证用户名是否存在
    const checkUsername = (username) => {
        fetch(`${API_BASE_URL}/api/check-username`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_name: username })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUsernameError(data.exists ? "Username already taken." : "");
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    //验证两次密码输入是否一致
    const checkPassword = (password, confirmPassword) => {
        setPasswordError(password !== confirmPassword ? "Passwords do not match." : "");
    };

    const isFormValid = () => {
        if (!isLoginView) {
            return formData.username && formData.password &&
                formData.password === formData.password_repeat &&
                !usernameError && !passwordError;
        } else {
            return formData.username && formData.password;
        }

    };

    //-------------------------------------处理登录、注册请求---------------------------------------
    const handleSubmit = async (event) => {
        event.preventDefault();  // 阻止表单默认提交行为

        const endpoint = isLoginView ? '/api/login' : '/api/register';  // 根据视图选择API端点
        const fullEndpoint = `${API_BASE_URL}${endpoint}`; // 拼接完整的API端点
        const userData = {
            user_name: event.target.username.value,
            user_password: event.target.password.value,
            ...(isLoginView ? {} : { password_repeat: event.target.password_repeat.value })
        };

        console.log(userData);

        try {
            const response = await fetch(fullEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            localStorage.setItem('authToken', data.token);  // 存储令牌
            setLoginMessage(data.message);
            navigate(isLoginView ? '/user/home' : '/user/profile');  // 根据视图导航

            console.log('Success:', data);
            // 这里可以处理登录后的逻辑，如保存token，跳转页面等
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = error.message;
            if (isLoginView) {
                setLoginMessage(errorMessage);
            }
        }
    };





    return (
        <div className="login_container">
            <div className="container-log-reg">
                <div className="form-box" style={{ transform: isLoginView ? 'translateX(0%)' : 'translateX(80%)' }}>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className={isLoginView ? "login-box" : "register-box"}>

                            <div className="title">{isLoginView ? 'Log in' : 'Register'}</div>
                            <div className="subtitle">{isLoginView ? 'Click, Connect, Enjoy' : 'Connect, Share, Love'}</div>
                            <div className="message">
                                {isLoginView && loginMessage && <p>{loginMessage}</p>}
                            </div>

                            <div className="input-container ic1">
                                <input placeholder=" " type="text" name="username" className="input" onChange={handleInputChange} value={formData.username} required />
                                <div className={isLoginView ? "cut cut_login cut-short" : "cut cut_register cut-short"}></div>
                                <label className="iLabel" htmlFor="username">Username</label>
                                <div id="username_error" >{usernameError && <p>{usernameError}</p>}</div>
                            </div>

                            <div className="input-container ic1">
                                <input placeholder=" " type="password" name="password" className="input" onInput={handleInputChange} value={formData.password} required />
                                <div className={isLoginView ? "cut cut_login cut-short" : "cut cut_register cut-short"}></div>
                                <label className="iLabel" htmlFor="password">Password</label>
                            </div>

                            {!isLoginView && (
                                <div className="input-container ic2">
                                    <input placeholder=" " type="password" name="password_repeat" className="input" onInput={handleInputChange} value={formData.password_repeat} required />
                                    <div className={isLoginView ? "cut cut_login cut-short" : "cut cut_register cut-short"}></div>
                                    <label className="iLabel" htmlFor="password">Repeat Password</label>
                                    <div id="password_error" >{passwordError && <p>{passwordError}</p>}</div>
                                </div>
                            )}

                            <button type="submit" className={isLoginView ? "btn_login_submit submit" : "btn_register_submit submit"} disabled={!isFormValid()}>
                                {isLoginView ? 'Reconnect' : 'Connect'}
                            </button>

                        </div>
                    </form>


                </div>

                <div className={isLoginView ? "con-box left hidden" : "con-box left"} >
                    <h2>Link Up, Log In</h2>
                    <img src={logo_img} alt="Background_logo" className='auth_logo_img' />
                    <button className="login_btn" onClick={() => setIsLoginView(true)}>Log in</button>
                </div>

                <div className={isLoginView ? "con-box right" : "con-box right hidden"}>
                    <h2>Sign Up, Dive In</h2>
                    <img src={logo_img}  alt="Background_logo" className='auth_logo_img' />
                    <button className="register_btn" onClick={() => setIsLoginView(false)}>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;