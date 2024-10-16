import React from 'react';

const Playlist = ({ playlistName, handlePlaylistName, playlistTrack}) => {
    return (
        <div className='create-playlist'>
            <h2>Create Your Playlist</h2>
            <input id='playlist' name='playlist' type='text' aria-label="Playlist Name" placeholder="Playlist name" value={playlistName} onChange={handlePlaylistName}/>
            {playlistTrack.map(trackObj => (
                <div className='track' key={trackObj.id}>
                    <p className='track-name'>{trackObj.track}</p>
                    <p className='artists'>{trackObj.artists.join(", ")}</p>
                </div>
            ))}
            <button id='save-playlist' type='submit'>Save to Spotify</button>
        </div>
    );
};

export default Playlist;