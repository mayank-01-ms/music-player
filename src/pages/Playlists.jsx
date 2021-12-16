import React, { useState, useEffect } from 'react';
import { MdDelete, MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import axios from "axios";

import IconButton from '../components/buttons/IconButton';

// import { MusicContext } from '../context/MusicContext';

import './styles/playlists.scss';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ListItem = ({playlist_name, handleDelete}) => {
    return (
        <Link to={`/playlist/${playlist_name}`}>
            <li>
                <div className="playlist_icon">
                    <MdPlaylistAddCheck 
                        size='1.3rem'
                    />
                </div>
                <div className="playlist_desc">
                    <p>{playlist_name}</p>
                    <div className="delete_icon" onClick={handleDelete}>
                        <MdDelete 
                            size="1.3rem"
                        />
                    </div>
                </div>
            </li>
        </Link>
    );
}

const Playlists = () => {

    document.title = "Playlists";

    // const { setSongsQueue } = useContext(MusicContext);

    const [playlists, setPlaylists] = useState(null);

    // if some data changes fetch the list again
    const [change, setChange] = useState(false);

    const fetchPlaylists = async () => {
        try {
            const response = await axios.get('/api/playlists');
            if(response.status === 200){
                setPlaylists(response.data);
            } 
        } catch (error) {
            console.log(error);
        }
    }

    const createPlaylist = async () => {
        const playlistName = prompt("Enter playlist name");
        try {
            const response = await axios({
                url: 'api/playlist',
                method: 'POST',
                data: {
                    playlistName
                }
            });
            if(response.status === 201){
                alert("Playlist successfully created");
                setChange(!change);
            } 

        } catch (error) {
            console.log(error);
        }
    }
    
    const deletePlaylist = async playlistId => {
        const confirm = window.confirm("Are you sure you want to delete this playlist");
        if(!confirm) return;

        try {
            const response = await axios({
                url: '/api/playlist',
                method: 'DELETE',
                data: {
                    playlistId
                }
            });
            if(response.status === 200){
                alert("Playlist successfully deleted");
                setChange(!change);
            } 
    
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        fetchPlaylists();
    }, [change])

    return (
        <div className="playlist_container">
            <h3>Your Playlists</h3>
            <ul className="playlists_list">
            {
                playlists && playlists.map((item) => {
                    return <ListItem 
                        key={item.id}
                        playlist_name={item.name}
                        handleDelete={() => deletePlaylist(item.id)}
                    />
                })
            }
            </ul>
            {
                !playlists &&
                (<div className="no_playlist_div">
                    <h3>No Playlists</h3>
                    <p>
                        Oops!! You don't have any playlist at the moment
                        Tap the create button to create a playlist.
                    </p>
                </div>)
            }
            <div className="create_btn" onClick={createPlaylist}>
                <IconButton 
                    title="Create new"
                    icon={<MdPlaylistAdd
                        size="1.5rem"
                    />}
                />
            </div>
        </div>
    )
}

export default Playlists
