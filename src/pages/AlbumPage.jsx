import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { MdPlayCircleOutline } from "react-icons/md";
import axios from 'axios';

import IconButton from '../components/buttons/IconButton';
import { IoPlay } from "react-icons/io5";

import { MusicContext } from '../context/MusicContext';

import CONSTANTS from '../constants/Constants';

import './styles/album.scss';

const { SONG_COVER_URL, ALBUM_COVER_URL } = CONSTANTS;

// create other component here only
const ListItem = ({songName, artist, cover, updateSongHandler}) => {
    return(
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
                    onClick={updateSongHandler}
                />
            </div>
        </li>
    )
}

const AlbumPage = () => {

    const { setSongsQueue, setCurrentlyPlayingIndex, setIsPlaying } = useContext(MusicContext);

    // getting album name from the URL
    const {album_name} = useParams();

    // state to store all album songs
    const [albumSongs, setAlbumSongs] = useState(null);
    
    const fetchAlbumSongs = async() => {
        try {
            const response = await axios.get('/api/album_songs/' + album_name);
            if(response.status === 200){
                setAlbumSongs(response.data);
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

    document.title = album_name;

    // updating songs queue and playing the song by default index is provided 0 so that music starts playing from start
    const updateSongsQueue = (index = 0) => {
        // updating the queue 
        setSongsQueue(albumSongs);

        // starting queue from the selected index
        setCurrentlyPlayingIndex(index);
        
        // start playing songs if not playing
        setIsPlaying(true);
    }

    return ( 
        <div className="albums_page_container">
            <div className="albums_details">
                <div className="album_cover">
                    <img src={ALBUM_COVER_URL + album_name + ".jpg"} alt={album_name + " cover"} />
                </div>
                <div className="album_info">
                    <p>{album_name}</p>
                    <p>Playlist created by us.</p>
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
            <h3>{albumSongs && albumSongs.length} Tracks</h3>  
                <ul>
                    {
                        albumSongs && albumSongs.map((song, index) => {
                            return <ListItem 
                                key={song.id}
                                updateSongHandler={() => updateSongsQueue(index)}
                                songName={song.title}
                                artist={song.artist_name}
                                cover={song.cover}
                                src={song.song_name} //redundant
                            />
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default AlbumPage
