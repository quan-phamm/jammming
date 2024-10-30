import React, { useState, useEffect, useRef } from "react";
import TrackCardForPlaylist from "./TrackCardForPlaylist";

const Playlist = ({
  playlistName,
  setPlaylistName,
  handlePlaylistName,
  playlistTrack,
  setPlaylistTrack,
  displaySearchResult,
  handleSavingToPlaylist,
}) => {
  const [createPlaylistHovered, setCreatePlaylistHovered] = useState(false);
  const [showInput, setShowInput] = useState(false);
  
  const playlistInputRef = useRef(null);
  const createPlaylistRef = useRef(null);

  const clearNewPlaylistInput = () => {
    setShowInput(false);
    setPlaylistName("");
  }

  useEffect(() => {
    if (showInput && playlistInputRef.current) {
      playlistInputRef.current.focus(); // Focus the input when it appears.
      const handleClick = () => {playlistInputRef.current.focus()};
      createPlaylistRef.current.addEventListener('click', handleClick);
      return () => {
        createPlaylistRef.current.removeEventListener('click', handleClick);
      };
    };
  }, [showInput]);


  return (
    <div
      className={`${
        displaySearchResult ? "playlist-search" : ""
      } create-playlist`}
    >
      <h2>Tracks Added</h2>
      <div className="new-playlist">
        <div
          className="create-new-playlist"
          onMouseEnter={() => setCreatePlaylistHovered(true)}
          onMouseLeave={() => setCreatePlaylistHovered(false)}
          onClick={() => {
            setShowInput(true)
            setCreatePlaylistHovered(false)
          }}
          ref={createPlaylistRef}
        >
          <button type="button" className={createPlaylistHovered ? "create-hovered" : ""}>
            <svg
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>new</title> <desc>Created with Sketch Beta.</desc>{" "}
                <defs> </defs>{" "}
                <g id="Page-1" strokeWidth="1" fillRule="evenodd">
                  {" "}
                  <g
                    id="Icon-Set"
                    transform="translate(-516.000000, -99.000000)"
                  >
                    {" "}
                    <path
                      d="M527.786,122.02 L522.414,125.273 C521.925,125.501 521.485,125.029 521.713,124.571 L524.965,119.195 L527.786,122.02 L527.786,122.02 Z M537.239,106.222 L540.776,109.712 L529.536,120.959 C528.22,119.641 526.397,117.817 526.024,117.444 L537.239,106.222 L537.239,106.222 Z M540.776,102.683 C541.164,102.294 541.793,102.294 542.182,102.683 L544.289,104.791 C544.677,105.18 544.677,105.809 544.289,106.197 L542.182,108.306 L538.719,104.74 L540.776,102.683 L540.776,102.683 Z M524.11,117.068 L519.81,125.773 C519.449,126.754 520.233,127.632 521.213,127.177 L529.912,122.874 C530.287,122.801 530.651,122.655 530.941,122.365 L546.396,106.899 C547.172,106.124 547.172,104.864 546.396,104.088 L542.884,100.573 C542.107,99.797 540.85,99.797 540.074,100.573 L524.619,116.038 C524.328,116.329 524.184,116.693 524.11,117.068 L524.11,117.068 Z M546,111 L546,127 C546,128.099 544.914,129.012 543.817,129.012 L519.974,129.012 C518.877,129.012 517.987,128.122 517.987,127.023 L517.987,103.165 C517.987,102.066 518.902,101 520,101 L536,101 L536,99 L520,99 C517.806,99 516,100.969 516,103.165 L516,127.023 C516,129.22 517.779,131 519.974,131 L543.817,131 C546.012,131 548,129.196 548,127 L548,111 L546,111 L546,111 Z"
                      id="new"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </button>
          {!showInput && (
            <p className={createPlaylistHovered ? "underline" : ""}>
              Create new playlist
            </p>
          )}
        </div>
        {showInput && (
          <div className="playlist-input">
            <input
              id="playlist-input"
              name="playlist"
              type="text"
              aria-label="Playlist Name"
              placeholder="Playlist name"
              value={playlistName}
              onChange={handlePlaylistName}
              ref={playlistInputRef}
            />
            <button type="button" id="clear-playlist-input" title="clear" onClick={clearNewPlaylistInput}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 460.775 460.775"
              >
                <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="trackcard-container">
        {playlistTrack.map((trackObj) => (
          <TrackCardForPlaylist
            setPlaylistTrack={setPlaylistTrack}
            key={trackObj.id}
            id={trackObj.id}
            track={trackObj.track}
            artists={trackObj.artists}
            uri={trackObj.uri}
          />
        ))}
        {playlistTrack.length > 0 ? (
          <div id="save-playlist">
            <button type="submit" onClick={handleSavingToPlaylist}>
              Save to Spotify
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Playlist;
