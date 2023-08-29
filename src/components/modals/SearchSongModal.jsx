import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";

import IconButton from '../buttons/IconButton';
import Input from '../inputs/Input';

import CONSTANTS from '../../constants/Constants';

const {SONG_COVER_URL} = CONSTANTS;

const ListItem = ({cover, songName, artist, addSongToPlaylist}) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return(
        <li className="search_item">
            <div className="cover">
                <img src={SONG_COVER_URL + cover} alt={songName + " cover"} />
            </div>
            <div className="song_details">
                <p>{songName}</p>
                <p>{artist}</p>
            </div>
            {isBookmarked ?
                <IoBookmark 
                    size='1.3rem'
                />
                :
                <IoBookmarkOutline 
                    onClick={() => {
                        setIsBookmarked(true)
                        addSongToPlaylist();
                    }}
                    size='1.3rem'
                />}
        </li>
    );
}

const SearchSongModal = ({handleClose, playlist_name, setIsListChanged}) => {

    const [songName, setSongName] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(null);

    const addSongToPlaylist = async (song_id, playlist_name) => {
        if(!song_id || !playlist_name) return;

        try {
            const response = await axios({
                method: 'POST',
                url: '/api/playlist/add_song',
                data:{
                    playlist_name, song_id
                }
            });
            if(response.status === 200){
                setIsListChanged(prevValue => !prevValue)
            }
        } catch (error) {
            console.log(error);
        }
    }

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
    }, [songName]);

    // blur the background
    document.querySelector('.App').classList.add('translucent_bg');

  return (
    <div className='modal search'>
      <h2 className="title">
        Search song
      </h2>
      <div className="search_box">
        <Input 
            placeholder="Search for songs"
            value={songName}
            onChange={e => setSongName(e.target.value)}
        />
        <div className="search_results">
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
                            addSongToPlaylist={() => addSongToPlaylist(song.id, playlist_name)}
                        />
                    })
                }
            </ul>
        </div>
      </div>
      <div className="btn">
        <IconButton 
          title={"Close"}
          onClick={() => {
            // remove the blurred bg
            document.querySelector('.App').classList.remove('translucent_bg');
            // close the modal
            handleClose();
          }}
        />
      </div>
    </div>
  )
}

export default SearchSongModal