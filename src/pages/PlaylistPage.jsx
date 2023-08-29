import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { MdPlayCircleOutline, MdPlaylistAdd } from "react-icons/md";
import axios from 'axios';

import IconButton from '../components/buttons/IconButton';
import SearchSongModal from '../components/modals/SearchSongModal';
import { IoPlay } from "react-icons/io5";

import { MusicContext } from '../context/MusicContext';

import CONSTANTS from '../constants/Constants';

import './styles/album.scss';

const { SONG_COVER_URL, ALBUM_COVER_URL } = CONSTANTS;

// create other component here only
const ListItem = ({songName, artist, cover, updateSongHandler, activeClass}) => {
    return(
        <li className={`song_list_item ${activeClass === true ? 'active' :''}`}>
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

const PlaylistPage = () => {

    const { 
        setSongsQueue, 
        setCurrentlyPlayingIndex, 
        setIsPlaying, 
        curentlyPlayingSongId,
        setCurentlyPlayingSongId
     } = useContext(MusicContext);

    // getting album name from the URL
    const {playlist_name} = useParams();

    // state to store all album songs
    const [playlistSongs, setPlaylistSongs] = useState(null);

    // this variable is passed to add songs modal which will reload playlist songs once a song is added
    const [isListChanged, setIsListChanged] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    
    const fetchPlaylistSongs = async() => {
        try {
            const response = await axios.get('/api/playlist_songs/' + playlist_name);
            if(response.status === 200){
                setPlaylistSongs(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPlaylistSongs();
        // Disabling eslint empty dependency warning
        // eslint-disable-next-line
    }, [isListChanged]);

    document.title = playlist_name;

    // updating songs queue and playing the song by default index is provided 0 so that music starts playing from start
    const updateSongsQueue = (index = 0) => {
        // if there are no songs so return from function else application will crash
        if(playlistSongs && playlistSongs.length === 0 ) return;

        // updating the queue 
        setSongsQueue(playlistSongs);

        // starting queue from the selected index
        setCurrentlyPlayingIndex(index);
        
        // start playing songs if not playing
        setIsPlaying(true);

        setCurentlyPlayingSongId(playlistSongs[index].id);
    }

    return ( 
        <div className="albums_page_container">
            <div className="albums_details">
                <div className="album_cover">
                    <img src={ALBUM_COVER_URL + "Playlist.jpg"} alt={playlist_name + " cover"} />
                </div>
                <div className="album_info">
                    <p>{playlist_name}</p>
                    <p>Your playlist.</p>
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
            <h3>{playlistSongs && playlistSongs.length} Tracks</h3>  
                <ul>
                    {
                        playlistSongs && playlistSongs.map((song, index) => {
                            return <ListItem 
                                key={song.id}
                                updateSongHandler={() => updateSongsQueue(index)}
                                songName={song.title}
                                artist={song.artist_name}
                                cover={song.cover}
                                activeClass={curentlyPlayingSongId === song.id}
                                src={song.song_name} //redundant
                            />
                        })
                    }
                </ul>
                <div className="create_btn">
                    <IconButton 
                        title="Add new"
                        icon={<MdPlaylistAdd
                            size="1.5rem"
                        />}
                        onClick={() => {
                            // document.querySelector('.App').classList.add('translucent_bg');
                            setModalOpen(true)
                        }}
                    />
                </div>
            </div>
            {modalOpen && <SearchSongModal 
                playlist_name={playlist_name}
                setIsListChanged={setIsListChanged}
                handleClose={() => setModalOpen(false)}
            />}
        </div>
    )
}

export default PlaylistPage
