import React from 'react';

const IconButton = ({icon, title, onClick}) => {
    return (
        <button className="icon_btn" onClick={onClick}>
            {icon}
            {title}
        </button>
    )
}

export default IconButton
