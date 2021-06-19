import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playPlaylist } from "../../features/Actions/actions";
import {selectAccessToken} from '../../features/Authentication/AuthenticationSlice';
import { setRejected } from "../../features/Search/SearchSlice";
import { loadPlaylistTracks } from "../Playlists/PlaylistsSlice";
import './playlist.css';

export default function Playlist(props) {
    const playlist = props.playlist;
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);

    useEffect(() => {
        if(playlist.tracks.length === 0) {
            dispatch(loadPlaylistTracks({
                accessToken: accessToken,
                playlist: playlist
            }));
        };
    });

    const sendPlayPlaylist = async() => {
        if(await playPlaylist(playlist, accessToken)) {
            return;
        } else {
            dispatch(setRejected(true));
        };
    };
    
    return (
        <div className="playlist-tile">
            <div className="playlist-description">
                <h5>{playlist.name}</h5>
                <p>Songs: {playlist.tracks.length}</p>
            </div>
            <div className="playlist-buttons">
                <button className="music-button" onClick={sendPlayPlaylist}>&#9656;</button>
            </div>
        </div>
    );
};