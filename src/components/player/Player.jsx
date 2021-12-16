import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
    IoPlayCircle, 
    IoPauseCircle, 
    IoCloseCircleOutline, 
    IoPlaySkipBackOutline, 
    IoPlaySkipForward  
} from 'react-icons/io5';

import { MusicContext } from '../../context/MusicContext';

import './player.scss';

import CONSTANTS from '../../constants/Constants';

const { MUSIC_URL, SONG_COVER_URL } = CONSTANTS;

// Function to convert time from seconds to in minutes and seconds 
const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
}

const Player = () => {

    // Global songs queue
    const { songsQueue, currentlyPlayingIndex } = useContext(MusicContext);
    // console.log(songsQueue);

    // is playing state from global
    const { isPlaying, setIsPlaying } = useContext(MusicContext);
    
    // references
    const audioPlayerRef = useRef();
    const progressBarRef = useRef();
    const animationRef = useRef(); 
    
    // states
    const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
    const [currentSongInfo, setCurrentSongInfo] = useState({});
    
    // duration of current song being played
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // loading music data into player on initial load and when music is changes
    useEffect(() => {
        setCurrentSongInfo({
            songName: songsQueue[currentMusicIndex].title,
            artistName: songsQueue[currentMusicIndex].artist_name,
            src: MUSIC_URL + songsQueue[currentMusicIndex].src,
            cover: SONG_COVER_URL + songsQueue[currentMusicIndex].cover
        });
        
    }, [currentMusicIndex, songsQueue]); 
    /* 
    added [songs queue] as dependency as whenever songsqueue or index changes
    update the song info
    as it might happen the index is (i) and we are trying to play music with the index (i)
    in another playlist so it wont happen as index is not changing and thus the song info
    */


    // change current music index to one received from global view
    useEffect(() => {
        setCurrentMusicIndex(currentlyPlayingIndex); //try making it global to reduce one more variable
    }, [currentlyPlayingIndex])

    // Updating duration of song and seek bar max value
    useEffect(() => {
        const seconds = Math.floor(audioPlayerRef.current.duration);
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    }, [audioPlayerRef?.current?.loadedmetadata, audioPlayerRef?.current?.readyState]);

    // Updating seek / progress bar while song is playing
    const whilePlaying = () => {
        progressBarRef.current.value = audioPlayerRef.current && audioPlayerRef.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    // Change range of music being played
    const changeRange = () => {
        audioPlayerRef.current.currentTime = progressBarRef.current.value;
        changePlayerCurrentTime();
    }

    // helper function to update player time
    const changePlayerCurrentTime = () => {
        progressBarRef.current.style.setProperty('--seek-before-width', `${progressBarRef.current.value / duration * 100}%`)
        setCurrentTime(progressBarRef.current.value);
    }

    // function to play / pause music
    const togglePlay = e => {
        // e.stopPropagation();
        setIsPlaying(!isPlaying);
    };

    // function to play next song in the queue
    const playNextSong = () => {
        if(currentMusicIndex >= songsQueue.length - 1)
            setCurrentMusicIndex(0);
        else
            setCurrentMusicIndex(currentMusicIndex+1);

        // Start playing music then
        setIsPlaying(true);
    }

    // function to play previous song
    const playPreviousSong = () => {
        if(currentMusicIndex <= 0)
            setCurrentMusicIndex(songsQueue.length - 1);
        else
            setCurrentMusicIndex(currentMusicIndex - 1);
        setIsPlaying(true);
    }

    // grabbing player element
    const player = document.getElementById('player');

    // Toggle play functionality
    if(isPlaying){
        audioPlayerRef.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying)
    } else{
        player && audioPlayerRef.current && audioPlayerRef.current.pause();
        cancelAnimationFrame(animationRef.current);
    }

    // Show media controls in notification
    if ('mediaSession' in navigator) {

        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: currentSongInfo.songName,
          artist: currentSongInfo.artist_name,
          album: 'Test',
          artwork: [
            { src: SONG_COVER_URL + currentSongInfo.cover,   sizes: '96x96',   type: 'image/png' },
            { src: SONG_COVER_URL + currentSongInfo.cover, sizes: '128x128', type: 'image/png' },
            { src: SONG_COVER_URL + currentSongInfo.cover, sizes: '192x192', type: 'image/png' },
            { src: SONG_COVER_URL + currentSongInfo.cover, sizes: '256x256', type: 'image/png' },
            { src: SONG_COVER_URL + currentSongInfo.cover, sizes: '384x384', type: 'image/png' },
            { src: SONG_COVER_URL + currentSongInfo.cover, sizes: '512x512', type: 'image/png' },
          ]
        });
      
        navigator.mediaSession.setActionHandler('play', function() {
            setIsPlaying(!isPlaying);
        });
        navigator.mediaSession.setActionHandler('pause', function() {
            setIsPlaying(!isPlaying);
        });
        navigator.mediaSession.setActionHandler('previoustrack', playPreviousSong);
        navigator.mediaSession.setActionHandler('nexttrack', playNextSong);
      }

    const openFullScreenPlayer = () => document.querySelector('.player').classList.add('full_screen');
    const closeFullScreenPlayer = e => {
        // Stoping event capturing as it will again trigger open full screen
        e.stopPropagation();
        document.querySelector('.player').classList.remove('full_screen')
    };

    // Updating title of page
    if(currentSongInfo.songName)
    document.title = currentSongInfo.songName + " - " + currentSongInfo.artistName; 

    // Playing next song (if its not last in the queue) as soon as current song ends
    // const _player = document.getElementById('player');
    // _player && _player.addEventListener("ended", () => {
    //     // pausing the music in order to update icons and states accordingly
    //     setIsPlaying(false);

    //     console.log('wewe');
    //     // if(currentMusicIndex < songsQueue.length - 1)
    //     //     playNextSong();
    // })

    return (
        <div className="player" onClick={openFullScreenPlayer}>
            <div className="full_screen_player">
                <div className="top">
                    <IoCloseCircleOutline 
                        size='2.5rem'
                        onClick={closeFullScreenPlayer}
                    />
                </div>
                <div className="bottom">
                    <div className="song_details">
                        <img src={currentSongInfo.cover} alt="song name" />
                        <p className="song_name">{currentSongInfo.songName}</p>
                        <p>{currentSongInfo.artistName}</p>
                    </div>
                    <div className="progress_bar">
                        <input 
                            type="range"
                            id="seek_bar"
                            defaultValue="0"
                            ref={progressBarRef} 
                            onChange={changeRange} 
                        />
                        <div className="timings">
                            <p>{calculateTime(currentTime)}</p>
                            <p>{(duration && !isNaN(duration)) && calculateTime(duration)}</p>
                        </div>
                    </div>
                    <div className="controls">
                        <IoPlaySkipBackOutline 
                            size="1.3rem" 
                            onClick={playPreviousSong}
                        />
                        <span className="toggleBtn" onClick={togglePlay}>
                        {
                            isPlaying ? 
                            <IoPauseCircle 
                                size='2.5rem'
                                color='red'
                                style={
                                    {margin: '0 1rem'}
                                }
                            />
                            :
                            <IoPlayCircle 
                                size='2.5rem'
                                color='red'
                                style={
                                    {margin: '0 1rem'}
                                }
                            />
                        }
                        </span>
                        <IoPlaySkipForward 
                            size="1.3rem" 
                            onClick={playNextSong}
                        />
                    </div>
                </div>
            </div>
            <div className="currently_playing">
                <div className="song_info">
                    <div className="song_cover">
                        <img src={currentSongInfo.cover} alt="song cover" />
                    </div>
                    <div className="song_details">
                        <p>{currentSongInfo.songName}</p>
                        <p>{currentSongInfo.artistName}</p>
                    </div>
                </div>
                <div className="controls">
                    {/* <IoPlaySkipBackOutline size="1.3rem" /> */}
                    <span className="toggleBtn" onClick={togglePlay}>
                    {
                        isPlaying ? 
                        <IoPauseCircle 
                            size='2.5rem'
                            color='red'
                            style={
                                {margin: '0 1rem'}
                            }
                        />
                        :
                        <IoPlayCircle 
                            size='2.5rem'
                            color='red'
                            style={
                                {margin: '0 1rem'}
                            }
                        />
                    }
                    </span>
                    {/* <IoPlaySkipForward size="1.3rem" /> */}
                </div>
            </div>
            <audio 
                ref={audioPlayerRef}
                src={currentSongInfo.src}
                id='player'
            />
        </div>
    );
}

export default Player;
