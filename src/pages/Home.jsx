import React from 'react';

import './styles/home.scss';

const Home = () => {
    return (
        <div className="home_container">
            <div className="trending">
                <h2>Trending songs</h2>

                <ul className="trending_lists lists">
                    <li>
                        <div className="list_item">
                        </div>
                        <div className="song_details card_details">
                            <p className="title">Song title</p>
                            <p className="album_name">Album title</p>
                        </div>
                    </li>
                    <li>
                        <div className="list_item"></div>
                        <div className="song_details card_details">
                            <p className="title">Song title</p>
                            <p className="album_name">Album title</p>
                        </div>
                    </li>
                    <li>
                        <div className="list_item"></div>
                        <div className="song_details card_details">
                            <p className="title">Song title</p>
                            <p className="album_name">Album title</p>
                        </div>
                    </li>
                    <li>
                        <div className="list_item"></div>
                        <div className="song_details card_details">
                            <p className="title">Song title</p>
                            <p className="album_name">Album title</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="top_albums">
                <h2>Top Albums</h2>

                <ul className="album_lists lists">
                    <li>
                        <div className="list_item"></div>
                        <div className="card_details">
                            <p className="title">Album Name</p>
                        </div>
                    </li>
                    <li>
                        <div className="list_item"></div>
                        <div className="card_details">
                            <p className="title">Album Name</p>
                        </div>
                    </li>
                    <li>
                        <div className="list_item"></div>
                        <div className="card_details">
                            <p className="title">Album Name</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="artists">
                <h2>Artists</h2>

                <ul className="artists_lists lists">
                    <li>
                        <div className="list_item rounded"></div>
                        <div className="card_details">
                            <p className="title">Artist Name</p>
                        </div>
                    </li>
                    <li>
                        <div className="list_item rounded"></div>
                        <div className="card_details">
                            <p className="title">Artist Name</p>
                        </div>
                    </li>
                    <li>
                        <div className="list_item rounded"></div>
                        <div className="card_details">
                            <p className="title">Artist Name</p>
                        </div>
                    </li>
                    <li>
                        <div className="list_item rounded"></div>
                        <div className="card_details">
                            <p className="title">Artist Name</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Home
