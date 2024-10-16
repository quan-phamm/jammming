import React from "react";

const TrackCard = ({ id, track, artists }) => {
    return (
        <div className='track-card' id={id}>
            <div className='track'>
                <p className='track-name'>{track}</p>
                <p className='artists'>{artists.join(", ")}</p>
            </div>
            <div className='track-button'>
                <button id='add-track' type='button'>+</button>
            </div>
        </div>
    )
};

export default TrackCard;