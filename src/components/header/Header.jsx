import React from 'react'
import { IoMusicalNotes } from "react-icons/io5";

const Header = () => {
    return (
        <div className="header">
            <div className="app_logo">
                <IoMusicalNotes 
                    size="2rem"
                    color="red"
                />
                <span style={{marginLeft: '1rem'}}></span> App name
            </div>
        </div>
    )
}

export default Header
