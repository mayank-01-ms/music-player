import React from 'react'
import './button.scss'

const Button = ({title}) => {
    return (
        <button className="primary_btn">
            {title}
        </button>
    )
}

export default Button
