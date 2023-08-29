import React from 'react'
import { NavLink } from 'react-router-dom';
import { IoMusicalNotes } from "react-icons/io5";
import { MdPlaylistAdd } from "react-icons/md";

import IconButton from '../buttons/IconButton';

import './navbar.scss';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="app_logo">
                <IoMusicalNotes 
                    size="3rem"
                    color="red"
                />
                <span style={{marginLeft: '1rem'}}></span> Bajate Raho!
            </div>
            <ul className="links">
                <li>
                    <NavLink to="/home">Home</NavLink>  
                </li>
                <li>
                    <NavLink to="/playlists">Playlists</NavLink>
                </li>
                <li>
                    <NavLink to="/profile">Settings</NavLink>
                </li>
            </ul>
            <h4>Your library</h4>
            <ul className="links">
                <li>
                    <NavLink to="/artists">Artists</NavLink>
                </li>
                <li>
                    <NavLink to="/albums">Albums</NavLink>
                </li>
            </ul>
            <IconButton 
                title="New Playlist"
                icon={<MdPlaylistAdd 
                    size="1.5rem"
                />}
            />
        </div>
    )
}

export default Navbar
