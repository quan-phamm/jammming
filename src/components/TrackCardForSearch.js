import React from "react";

const TrackCardForSearch = ({ id, track, artists, setPlaylistTrack }) => {
    const handleAdd = () => {
        setPlaylistTrack(prev => {
            if (prev.some(trackObj => trackObj.id === id)) {
                alert("You already add this song to your playlist!")
                return prev;
            } else {
                return [...prev, {id, track, artists}];
            };
        });
    };

    return (
        <div className='track-card' id={id}>
            <div className='track'>
                <p className='track-name'>{track}</p>
                <p className='artists'>{artists.join(", ")}</p>
            </div>
            <div className='track-button'>
                <button id='add-track' type='button' onClick={handleAdd}>+</button>
            </div>
        </div>
    )
};

export default TrackCardForSearch;