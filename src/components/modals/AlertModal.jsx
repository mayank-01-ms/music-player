import React from 'react';
import './modal.scss';

import IconButton from '../buttons/IconButton';

const AlertModal = ({title, msg, handleClose}) => {

  document.querySelector('.App').classList.add('translucent_bg');
  
  return (
    <div className='modal'>
      <h2 className="title">
        {title}
      </h2>
      <p className="msg">
        {msg}
      </p>
      <div className="btn">
        <IconButton 
          title={"Close"}
          onClick={() => {
            document.querySelector('.App').classList.remove('translucent_bg');
            handleClose();
          }}
        />
      </div>
    </div>
  )
}

export default AlertModal