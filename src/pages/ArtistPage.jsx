import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { MdPlayCircleOutline } from "react-icons/md";

import IconButton from '../components/buttons/IconButton';
import { IoPlay } from "react-icons/io5";

import CONSTANTS from '../constants/Constants';

import { MusicContext } from '../context/MusicContext';

import './styles/album.scss';

const { SONG_COVER_URL, ARTIST_AVATAR_URL } = CONSTANTS;

// create other component here only
const ListItem = ({songName, cover, artist, updateSongHandler}) => {
    return (
        <li className="song_list_item">
            <div className="song_cover">
            <img src={SONG_COVER_URL + cover} alt={songName + " cover"} />
            </div>
            <div className="song_details">
                <p>{songName}</p>
                <p>{artist}</p>
            </div>
            <div className="control_button">
                <IoPlay 
                    size='1.3rem'
                    onClick={() => updateSongHandler()}
                />
            </div>
        </li>
    );
}

const ArtistPage = () => {

    const { setSongsQueue, setCurrentlyPlayingIndex, setIsPlaying } = useContext(MusicContext);

    // getting album name from the URL
    const {artist_name} = useParams();

    // state to store all album songs
    const [artistSongs, setArtistSongs] = useState(null);
    
    const fetchAlbumSongs = async() => {
        try {
            const response = await axios.get('/api/artist_songs/' + artist_name);
            if(response.status === 200){
                setArtistSongs(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAlbumSongs();
        // Disabling eslint empty dependency warning
        // eslint-disable-next-line
    }, []);

    document.title = artist_name;

    // updating songs queue and playing the song by default index is provided 0 so that music starts playing from start
    const updateSongsQueue = (index = 0) => {
        // updating the queue 
        setSongsQueue(artistSongs);

        // starting queue from the selected index
        setCurrentlyPlayingIndex(index);
        
        // start playing songs if not playing
        setIsPlaying(true);
    }

    return ( 
        <div className="albums_page_container">
            <div className="albums_details">
                <div className="album_cover">
                    <img src={ARTIST_AVATAR_URL + artist_name +".jpg"} alt={artist_name + " cover"} />
                </div>
                <div className="album_info">
                    <p>{artist_name}</p>
                    <p>All songs of {artist_name} here.</p>
                    <IconButton 
                        title="Play all"
                        icon={<MdPlayCircleOutline 
                            size='1.2rem'
                        />}
                        onClick={() => updateSongsQueue()}
                    />
                </div>
            </div>
            <div className="album_songs"> 
            <h3>{artistSongs && artistSongs.length} Tracks</h3>  
                <ul>
                {
                        artistSongs && artistSongs.map((song, index) => {
                            return <ListItem 
                                key={song.id}
                                updateSongHandler={() => updateSongsQueue(index)}
                                songName={song.title}
                                cover={song.cover}
                                artist={artist_name}
                                src={song.song_name} //redundant
                            />
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default ArtistPage
