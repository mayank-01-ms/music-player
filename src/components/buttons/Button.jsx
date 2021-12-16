import React from 'react'
import './button.scss'

const Button = ({title, onClick, style}) => {
    return (
        <button className="primary_btn" styles={style} onClick={onClick}>
            {title}
        </button>
    )
}

export default Button
