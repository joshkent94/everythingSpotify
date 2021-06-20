import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../../features/Authentication/AuthenticationSlice";
import Playlist from "../Playlist/playlist";
import { loadPlaylists, selectPlaylists } from "./PlaylistsSlice";
import './Playlists.css';

export default function Playlists() {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);
    const playlists = useSelector(selectPlaylists);

    useEffect(() => {
        if(playlists.length === 0) {
            dispatch(loadPlaylists({accessToken: accessToken}));
        };
    });

    return (
        <div>
            <div className="heading">
                <h1>How about some music?</h1>
                <h3>Search, play and save your favourite songs</h3>
                <p>
                    Music will play on whichever device you last played Spotify,
                    make sure to open Spotify on your device of choice and play a song
                    before using this app
                </p>
            </div>
            <div className="playlist-area">
                {playlists.map(playlist => {
                    return <Playlist key={playlist.id} playlist={playlist} />
                })}
            </div>
        </div>
    );
};