import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';

import TrendingSongs from '../components/home/TrendingSongs';
import Artists from '../components/home/Artists';
import Albums from '../components/home/Albums';

import { MusicContext } from '../context/MusicContext';

import './styles/home.scss';

const Home = () => {

    const { setSongsQueue, setCurrentlyPlayingIndex, setIsPlaying } = useContext(MusicContext);

    // states
    const [trendingSongs, setTrendingSongs] = useState(null);
    const [artists, setArtists] = useState(null);
    const [albums, setAlbums] = useState(null);

    // Functions to fetch data
    const fetchTrendingSongs = async () => {
        try {
            const response = await axios.get('/api/trending_songs');
            if (response.status === 200){
                setTrendingSongs(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchArtists = async () => {
        try {
            const response = await axios.get('/api/artists');
            if (response.status === 200){
                setArtists(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAlbums = async () => {
        try {
            const response = await axios.get('/api/albums');
            if (response.status === 200){
                setAlbums(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTrendingSongs();
        fetchArtists();
        fetchAlbums();
        // Disabling eslint empty dependency warning
        // eslint-disable-next-line
    }, []);

    // updating songs queue and playing the song by default index is provided 0 so that music starts playing from start
    const updateSongsQueue = (index = 0) => {
        // updating the queue 
        setSongsQueue(trendingSongs);

        // starting queue from the selected index
        setCurrentlyPlayingIndex(index);
        
        // start playing songs if not playing
        setIsPlaying(true);
    }

    document.title = "Home";

    return (
        <div className="home_container">
            <div className="trending">
                <h2>Trending songs</h2>

                <ul className="trending_lists lists">
                {
                    trendingSongs && 
                    trendingSongs.map((song, index) => {
                        return <TrendingSongs 
                            key={song.id}
                            song_name = {song.title}
                            artist_name = {song.artist_name}
                            cover={song.cover}
                            updateSongsHandler={() => updateSongsQueue(index)}
                        />
                    })
                }
                </ul>
            </div>

            <div className="top_albums">
                <h2>Top Albums</h2>

                <ul className="album_lists lists">
                {
                    albums && 
                    albums.map(album => {
                        return <Albums 
                            key={album.id}
                            album_name = {album.album_name}
                            album_cover = {album.cover}
                        />
                    })
                }
                </ul>
            </div>

            <div className="artists">
                <h2>Artists</h2>
                <ul className="artists_lists lists">
                {
                    artists && 
                    artists.map(artist => {
                        return <Artists 
                                key={artist.id}
                                artist_name = {artist.name}
                                artist_avatar = {artist.avatar}
                            />
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default Home
