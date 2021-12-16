import React from 'react';
// import { Link } from 'react-router-dom';

import CONSTANTS from '../../constants/Constants';

const { SONG_COVER_URL } = CONSTANTS;

const TrendingSongs = ({song_name, artist_name, cover, updateSongsHandler}) => {
    return (
        // <Link to={`/song/${song_name}`}>
            <li onClick={updateSongsHandler}>
                <div className="list_item">
                    <img src={SONG_COVER_URL + cover} alt="cover" />
                </div>
                <div className="song_details card_details">
                    <p className="title">{song_name}</p>
                    <p className="album_name">{artist_name}</p>
                </div>
            </li>
        // </Link>
    )
}

export default TrendingSongs;
