import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";

import { AuthContext } from '../auth/AuthProvider';

import Input from '../components/inputs/Input';
import Button from '../components/buttons/Button';

import './styles/login.scss';

const Login = () => {

    document.title = "Login";

    const history = useHistory();

    // set global state as logged in
    const { authMemo } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // error messages
    const [msg, setMsg] = useState('');

    const loginHandler = async e => {
        setMsg('');
        e.preventDefault();

        try {
            const response = await axios({
                method: "POST",
                url: "/api/login",
                data: {
                    email, password
                }
            });

            if (response.status === 200) {
                setMsg(response.data.success);
                setTimeout(() => {
                    history.push('/');
                    authMemo.login();
                }, 500);
            }

        } catch (error) {
            console.log(error);
            let errorMessage = error.response.data.error;
            if (errorMessage)
                setMsg("*" + errorMessage);
            else
                setMsg("Something went wrong try again later");
        }
    }

    return (
        <div className="login_container">
            <h2>Login</h2>
            <p className="l_desc">Login to create playlists, access your favourite artists / songs and get personalised experience</p>
            <form autoComplete="none">
                <Input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    title="Login"
                    onClick={loginHandler}
                />
            </form>
            <div className="msg_div error" style={{ marginTop: '10px' }}>
                {msg}
            </div>
            <p className="forgot_password">
                <Link to="/forgot_password">Forgot Password?</Link>
            </p>
            <div className="no_accDiv">
                Don't have an account?
                <Link to="/signup"> Signup</Link>
            </div>
        </div>
    )
}

export default Login
