import React from "react";

const TrackCardForPlaylist = ({ id, track, artists, setPlaylistTrack }) => {
    const handleRemove = () => {
        setPlaylistTrack(prev => prev.filter(trackObj => trackObj.id !== id));
    };
    
    return (
        <div className='track-card' id={id}>
            <div className='track'>
                <p className='track-name'>{track}</p>
                <p className='artists'>{artists.join(", ")}</p>
            </div>
            <div className='track-button'>
                <button id='remove-track' type='button' onClick={handleRemove}>-</button>
            </div>
        </div>
    )
};

export default TrackCardForPlaylist;