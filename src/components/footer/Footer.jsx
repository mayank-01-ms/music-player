import React from 'react';
import {  IoHomeOutline, IoSearchOutline, IoListOutline, IoPersonOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <ul>
                <NavLink to="/home" activeClassName="active">
                    <li>
                        <IoHomeOutline size='1.2rem' />
                        Home
                    </li>
                </NavLink>
                <NavLink to="/search" activeClassName="active">
                    <li>
                        <IoSearchOutline size='1.2rem' />
                        Search
                    </li>
                </NavLink>
                <NavLink to="/playlists" activeClassName="active">
                    <li>
                        <IoListOutline size='1.2rem' />
                        Playlists
                    </li>
                </NavLink>
                <NavLink to="/profile" activeClassName="active">
                    <li>
                        <IoPersonOutline size='1.2rem' />
                        Me
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}

export default Footer
