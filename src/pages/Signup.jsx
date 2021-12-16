import React, { useState } from 'react';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';

import Input from '../components/inputs/Input';
import Button from '../components/buttons/Button';

import './styles/login.scss';

const Signup = () => {
    document.title = "Signup";

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');

    // error messages
    const [msg, setMsg] = useState('');

    const handleSubmit = async e => {
        setMsg("");
        e.preventDefault();

        if(email.length > 100 || email.length < 10){
            setMsg("* Email must contain 10 - 100 charachters");
            return;
        }
        else if(password.length > 30 || password.length < 8){
            setMsg("* Password must contain 8 - 30 charachters");
            return;
        }
        else if(password !== cpassword){
            setMsg("Passwords do not match");
            return;
        }

        try {
            const response = await axios({
                method: "POST",
                url: "/api/signup",
                data: {
                    email, password
                }
            });
            
            if(response.status === 201){
                setMsg('Registeration successfull')
                setTimeout(() => {
                    history.push('/profile');
                }, 500);
            }

        } catch (error) {
            if(error.response)
                setMsg(error.response.data.error);
            else
                setMsg('Cannot register. Please try again later');
        }
    }

    return (
        <div className="login_container">
            <h2>Signup</h2>
            <p className="l_desc">Signup to create playlists, access your favourite artists / songs and get personalised experience</p>
            <form autoComplete="none">
                <Input 
                    type="text" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
                <Input 
                    type="password" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <Input 
                    type="password" 
                    placeholder="Confirm password"
                    value={cpassword}
                    onChange={e=>setcPassword(e.target.value)}
                />
                <Button 
                    title="Signup" 
                    onClick={handleSubmit}
                />
            </form>
            <div className="msg_div error" style={{marginTop: '10px'}}>
                {msg}
            </div>
            <div className="no_accDiv" style={{marginTop: '1rem'}}>
                Already have an account? 
                <Link to="/login"> Login</Link>
            </div>
        </div>
    )
}

export default Signup
