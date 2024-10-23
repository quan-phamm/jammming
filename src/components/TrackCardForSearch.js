import React from "react";

const TrackCardForSearch = ({ id, track, artists, uri, setPlaylistTrack }) => {
  const handleAdd = () => {
    setPlaylistTrack((prev) => {
      if (prev.some((trackObj) => trackObj.id === id)) {
        alert("You already add this song to your playlist!");
        return prev;
      } else {
        return [...prev, { id, track, artists, uri }];
      }
    });
  };

  return (
    <div className="track-card" id={id}>
      <div className="track">
        <p className="track-name">{track}</p>
        <p className="artists">{artists.join(", ")}</p>
      </div>
      <div className="track-button">
        <button id="add-track" type="button" onClick={handleAdd}>
          <svg
            fill="#fff"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Zm5-9a1,1,0,0,1-1,1H13v3a1,1,0,0,1-2,0V13H8a1,1,0,0,1,0-2h3V8a1,1,0,0,1,2,0v3h3A1,1,0,0,1,17,12Z"></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TrackCardForSearch;
