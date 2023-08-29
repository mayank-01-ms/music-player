import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './styles/artists.scss';

import AlertModal from '../components/modals/AlertModal';

import CONSTANTS from '../constants/Constants';
const { ARTIST_AVATAR_URL } = CONSTANTS;

const ListItem = ({artist, followArtist}) => {
    return (
        <li>
            <div className="artist_profile_image">
                <img src={ARTIST_AVATAR_URL + artist.avatar} alt={artist.name + " cover"} />
            </div>
            <div className="artist_info">
                {artist.name}
            </div>
            <div className="follow-btn" onClick={() => followArtist(artist.id)}>
                Follow
            </div>
        </li>
    );
}

const Artists = () => {
    
    document.title = "Artists";

    const [artists, setArtists] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDetails, setModalDetails] = useState({});

    const fetchArtists = async () => {
        try {
            const response = await axios.get('/api/artists');
            if(response.status === 200){
                setArtists(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      fetchArtists();
    }, []);

    const followArtist = async artistID => {
        setModalDetails({});

        try {
            const response = await axios.get('/api/follow_artist/' + artistID);
            if(response.status === 200){
                setModalOpen(true);
                setModalDetails({title: "Alert", msg: response.data?.message})
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="artists_page_container">
            <h3>Artists</h3>
            <ul className="artists_list">
                {
                    artists && artists.map((artist) => {
                        return <ListItem 
                            key={artist.id}
                            artist={artist}
                            followArtist={followArtist}
                        />
                    })
                }
            </ul>
            {modalOpen && <AlertModal 
                title={modalDetails.title}
                msg={modalDetails.msg}
                handleClose={() => setModalOpen(false)}
            />}
        </div>
    );
}

export default Artists