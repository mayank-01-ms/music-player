import React from 'react'

// This component targets mobile / tablets
const Home = ({children}) => {
    return (
        <div>
            {/* There can be seperate header and footer */}
            <div className="header">

            </div>

            {/*Since this is a container so it render everything inside it  
            therefore rendering children component
            */}
            {children}
            
            {/* Add a global music player here so that it stays rendered on each page*/}

            {/* footer contains routing links */}
            <div className="footer">
                <ul>
                    <li>
                        Home
                    </li>
                    <li>
                        Search
                    </li>
                    <li>
                        Playlists
                    </li>
                    <li>
                        Me
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Home
