import Tracklist from "../Tracklist/tracklist";
import './Music.css';
import AddSongToPlaylist from "../AddSongToPlaylist/AddSongToPlaylist";
import { useSelector } from "react-redux";
import { selectPlaylistSelect } from "../Playlists/PlaylistsSlice";

export default function Music() {
    const isPlaylistSelect = useSelector(selectPlaylistSelect);

    return (
        <div>
            <div className="heading">
                <h1>How about some music?</h1>
                <h3>Search, play and save your favourite songs</h3>
                <p>
                    Music will play on whichever device you last played Spotify,
                    make sure to open Spotify on your device of choice and play a song
                </p>
            </div>
            {isPlaylistSelect ? <AddSongToPlaylist /> : <Tracklist />}
        </div>
    );
};