import React, { createContext, useState } from 'react';

export const MusicContext = createContext();

const MusicProvider = ({children}) => {

    // currently playing or not state
    const [isPlaying, setIsPlaying] = useState(false);

    // currently playing song id
    const [curentlyPlayingSongId, setCurentlyPlayingSongId] = useState(null);

    // This will contain currently playing index in the queue
    // Also it will help in playing song at a particular index and start the queue from there
    const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(0);
    const [songsQueue, setSongsQueue] = useState([{
        title: 'Song name',
        cover: 'Music.jpg'
    }]);

    return(
        <MusicContext.Provider
            value={{
                isPlaying,
                setIsPlaying,
                songsQueue,
                setSongsQueue,
                currentlyPlayingIndex,
                setCurrentlyPlayingIndex,
                curentlyPlayingSongId,
                setCurentlyPlayingSongId
            }}
        >
            {children}
        </MusicContext.Provider>
    )
}

export default MusicProvider;
