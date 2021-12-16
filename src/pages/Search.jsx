import React, { useState, useEffect, useContext } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';

import Input from '../components/inputs/Input';

import { MusicContext } from '../context/MusicContext';

import CONSTANTS from '../constants/Constants';

import './styles/search.scss';

const {SONG_COVER_URL} = CONSTANTS;

const ListItem = ({cover, songName, artist, updateSongHandler}) => {
    return(
        <li className="search_item" onClick={updateSongHandler}>
            <div className="cover">
                <img src={SONG_COVER_URL + cover} alt={songName + " cover"} />
            </div>
            <div className="song_details">
                <p>{songName}</p>
                <p>{artist}</p>
            </div>
        </li>
    );
}

const LoadingIcon = () => {
    return (
        <div className="loading_icon">
            Loading
        </div>
    );
}

const Search = () => {

    const { setSongsQueue, setCurrentlyPlayingIndex, setIsPlaying } = useContext(MusicContext);

    const [songName, setSongName] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(null);

    const searchSong = async() => {
        // resetting search results else they may prevail even after input field is cleared
        setSearchResults(null);
        
        if(songName.length === 0) return;

        setLoading(true);
        try {
            const response = await axios.get('/api/search/' + songName);
            if(response.status === 200){
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
        // Disabling eslint empty dependency warning
        // eslint-disable-next-line
    }, [songName])

    // updating songs queue and playing the song by default index is provided 0 so that music starts playing from start
    const updateSongsQueue = (index = 0) => {
        // updating the queue 
        console.log(searchResults);
        setSongsQueue(searchResults);

        // starting queue from the selected index
        setCurrentlyPlayingIndex(index);
        
        // start playing songs if not playing
        setIsPlaying(true);
    }

    document.title = 'Search';

    return (
        <div className="search_container">
            <h3>Search</h3>
            <div className="search_field">
                <Input 
                    placeholder="Search for any song"
                    value={songName}
                    onChange={e => setSongName(e.target.value)}
                />
                <IoSearchOutline 
                    size="1.3rem"
                />
            </div>
            <div className="search_results">
                {
                    loading && <LoadingIcon />
                }                
                <ul>
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
        </div>
    )
}

export default Search
