import React from "react";
import TrackCardForPlaylist from "./TrackCardForPlaylist";

const Playlist = ({
  playlistName,
  setPlaylistName,
  handlePlaylistName,
  playlistTrack,
  setPlaylistTrack,
  setPlaylistUris,
  displaySearchResult
}) => {
  const summarizeUris = () => {
    setPlaylistUris(playlistTrack.map((trackObj) => trackObj.uri));
    setPlaylistTrack([]);
    setPlaylistName("");
  };

  return (
    <div className={`${displaySearchResult ? 'playlist-search': ''} create-playlist`}>
      <h2>Create Your Playlist</h2>
      <input
        id="playlist"
        name="playlist"
        type="text"
        aria-label="Playlist Name"
        placeholder="Playlist name"
        value={playlistName}
        onChange={handlePlaylistName}
      />
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
        <button id="save-playlist" type="submit" onClick={summarizeUris}>
          Save to Spotify
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Playlist;
