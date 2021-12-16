import React from 'react';
import {Link} from 'react-router-dom';

import CONSTANTS from '../../constants/Constants';

const { ARTIST_AVATAR_URL } = CONSTANTS;

const Artists = ({artist_name, artist_avatar}) => {
    return (
        <Link to={`/artist/${artist_name}`}>
            <li>
                <div className="list_item rounded">
                    <img src={ARTIST_AVATAR_URL + artist_avatar} alt={artist_name + ' image'} />
                </div>
                <div className="card_details">
                    <p className="title">{artist_name}</p>
                </div>
            </li>
        </Link>
    )
}

export default Artists
