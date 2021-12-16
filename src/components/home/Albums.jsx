import React from 'react';
import { Link } from 'react-router-dom';

import CONSTANTS from '../../constants/Constants';

const { ALBUM_COVER_URL } = CONSTANTS;

const Albums = ({album_name, album_cover}) => {
    return (
        <Link to={`/album/${album_name}`}>
            <li>
                <div className="list_item">
                    <img src={ALBUM_COVER_URL + album_cover} alt="Album cover" />
                </div>
                <div className="card_details">
                    <p className="title">{album_name}</p>
                </div>
            </li>
        </Link>
    )
}

export default Albums
