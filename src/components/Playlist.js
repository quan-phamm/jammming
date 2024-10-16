import React from 'react';
import TrackCardForPlaylist from './TrackCardForPlaylist';

const Playlist = ({ playlistName, handlePlaylistName, playlistTrack, setPlaylistTrack }) => {
    return (
        <div className='create-playlist'>
            <h2>Create Your Playlist</h2>
            <input id='playlist' name='playlist' type='text' aria-label="Playlist Name" placeholder="Playlist name" value={playlistName} onChange={handlePlaylistName}/>
            {playlistTrack.map(trackObj => (
                <TrackCardForPlaylist setPlaylistTrack={setPlaylistTrack} key={trackObj.id} id={trackObj.id} track={trackObj.track} artists={trackObj.artists}/>
            ))}
            <button id='save-playlist' type='submit'>Save to Spotify</button>
        </div>
    );
};

export default Playlist;