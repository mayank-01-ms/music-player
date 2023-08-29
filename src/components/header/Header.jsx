import React, { useState, useEffect, useContext } from 'react'
import { IoMusicalNotes, IoSearchOutline } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";
import axios from 'axios';

import Input from '../inputs/Input';

import { MusicContext } from '../../context/MusicContext';

import avatar from '../../assets/faded.png';

import CONSTANTS from '../../constants/Constants';

const { SONG_COVER_URL } = CONSTANTS;

const ListItem = ({ cover, songName, artist, updateSongHandler }) => {
    return (
        <li className="search_item" onClick={updateSongHandler}>
            <div className="cover">
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
    );
}

//CREATE A GLOBAL ONE
const LoadingIcon = () => {
    return (
        <div className="loading_icon">
            Loading
        </div>
    );
}

const Header = () => {

    const { setSongsQueue, setCurrentlyPlayingIndex, setIsPlaying } = useContext(MusicContext);

    const [searchResults, setSearchResults] = useState();

    const [songName, setSongName] = useState('');
    const [loading, setLoading] = useState(false);

    const searchSong = async () => {
        // resetting search results else they may prevail even after input field is cleared
        setSearchResults(null);

        if (songName.length === 0) return;

        setLoading(true);
        try {
            const response = await axios.get('/api/search/' + songName);
            if (response.status === 200) {
                setSearchResults(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        searchSong();
    }, [songName])

    // updating songs queue and playing the song by default index is provided 0 so that music starts playing from start
    const updateSongsQueue = (index = 0) => {
        // updating the queue 
        setSongsQueue(searchResults);

        // starting queue from the selected index
        setCurrentlyPlayingIndex(index);

        // start playing songs if not playing
        setIsPlaying(true);
    }

    return (
        <>
            <header className="header">
                <div className="app_logo">
                    <IoMusicalNotes
                        size="2rem"
                        color="red"
                    />
                    <span style={{ marginLeft: '1rem' }}></span> Bajate Raho!
                </div>
            </header>

            {/* Header only for large screens */}
            <header className="largeScreen_header">
                <div className="search_field">
                    <Input
                        placeholder="Search"
                        value={songName}
                        onChange={e => setSongName(e.target.value)}
                    />
                    <IoSearchOutline
                        size="1.3rem"
                    />
                </div>
                <div className="search_results" style={searchResults === null ? { display: 'none' } : {display: 'block'}}>
                    <ul>
                        {
                            loading && <LoadingIcon />
                        }
                        {
                            searchResults && searchResults.map((song, index) => {
                                return <ListItem
                                    key={song.id}
                                    id={song.id}
                                    songName={song.title}
                                    artist={song.artist_name}
                                    cover={song.cover}
                                    src={song.song_name}
                                    updateSongHandler={() => updateSongsQueue(index)}
                                />
                            })
                        }
                    </ul>
                </div>
                <div className="profile">
                    <div className="profile_icon">
                        <img src={avatar} alt="Profile" />
                    </div>
                    <p className="name">Test user</p>
                </div>
            </header>
        </>
    )
}

export default Header
