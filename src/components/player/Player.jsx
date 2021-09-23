import React, { useState } from 'react';
import { IoPlayCircle, IoPauseCircle } from 'react-icons/io5'

// , IoPlaySkipBackOutline, IoPlaySkipForward 

import image from '../../assets/faded.png';
import test from '../../assets/test.mp3';

import './player.scss';

const Player = () => {

    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const player = document.getElementById('player');

    if(isPlaying){
        player.play();
    } else{
        player && player.pause();
    }

    if ('mediaSession' in navigator) {

        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: 'Faded - Alan Walker',
          artist: 'Alan Walker',
          album: 'tes',
          artwork: [
            { src: image,   sizes: '96x96',   type: 'image/png' },
            { src: image, sizes: '128x128', type: 'image/png' },
            { src: image, sizes: '192x192', type: 'image/png' },
            { src: image, sizes: '256x256', type: 'image/png' },
            { src: image, sizes: '384x384', type: 'image/png' },
            { src: image, sizes: '512x512', type: 'image/png' },
          ]
        });
      
        navigator.mediaSession.setActionHandler('play', function() {
            setIsPlaying(!isPlaying);
        });
        navigator.mediaSession.setActionHandler('pause', function() {
            setIsPlaying(!isPlaying);
        });
        navigator.mediaSession.setActionHandler('previoustrack', function() {});
        navigator.mediaSession.setActionHandler('nexttrack', function() {});
      }

    return (
        <div className='player'>
            <div className="song_info">
                <div className="song_cover">
                    <img src={image} alt="song cover" />
                </div>
                <div className="song_details">
                    <p>Song Name</p>
                    <p>Album Name</p>
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
            <audio 
                src={test}
                id='player'
            />
        </div>
    );
}

export default Player;
