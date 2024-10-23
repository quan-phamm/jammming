import React from "react";
import TrackCardForPlaylist from "./TrackCardForPlaylist";

const Playlist = ({
  playlistName,
  handlePlaylistName,
  playlistTrack,
  setPlaylistTrack,
  displaySearchResult,
  handleSavingToPlaylist
}) => {
  return (
    <div
      className={`${
        displaySearchResult ? "playlist-search" : ""
      } create-playlist`}
    >
      <h2>Create Your Playlist</h2>
      <input
        id="playlist-input"
        name="playlist"
        type="text"
        aria-label="Playlist Name"
        placeholder="Playlist name"
        value={playlistName}
        onChange={handlePlaylistName}
      />
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
