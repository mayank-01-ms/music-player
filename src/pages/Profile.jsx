import React, { useEffect } from 'react';
// import Button from '../components/buttons/Button';

import './styles/profile.scss';

const Profile = () => {

    const toggleDarkMode = () => {
        const container = document.querySelector('.App');
        const toggle = document.getElementById('darkModeToggle');
        if(toggle.checked){
            container.classList.add('dark');
            localStorage.setItem('darkMode', true);
        } else{
            container.classList.remove('dark'); 
            localStorage.setItem('darkMode', false);
        }
    }
    
    // toggling on the checkbox if dark mode is enabled
    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode');
        const toggle = document.getElementById('darkModeToggle');
        if(darkMode){
            toggle.checked = true;
        }
    }, []);

    return (
        <div className="profile_container">
            <div className="profile_details">
            <h3>Profile</h3>
                <p>Email: test@test.com</p>
                {/* <Button 
                    title="Logout"
                /> */}
            </div>
            <div className="user_settings">
                <h3>Settings</h3>
                <ul>
                    <li>
                        <label htmlFor="darkModeToggle">Dark mode</label>
                        <input type="checkbox" id="darkModeToggle" onChange={toggleDarkMode} />
                        <label htmlFor="darkModeToggle" className="toggle"></label>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Profile
