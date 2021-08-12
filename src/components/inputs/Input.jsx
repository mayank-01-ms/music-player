import React from 'react'
import './input.scss'

const Input = ({iconName, ...otherProps}) => {
    return (
        <input 
            className='appInputField'
            {...otherProps}
        />
    )
}

export default Input
