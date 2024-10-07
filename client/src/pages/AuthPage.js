import React from 'react';
import AuthForm from '../components/AuthForm';
import Header from '../components/Header'; 

const AuthPage = () => {
    return (
        <div className="singlePage authPage">
            <Header />
            <AuthForm />
        </div>
    );
};

export default AuthPage;