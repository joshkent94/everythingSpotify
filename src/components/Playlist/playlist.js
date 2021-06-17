import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {selectAccessToken} from '../../features/Authentication/AuthenticationSlice';
import { loadPlaylistTracks } from "../Playlists/PlaylistsSlice";

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
    
    return (
        <div className="tile">
            <div>
                <h5>{playlist.name}</h5>
            </div>
            <div className="buttons">
                <button className="music-button">&#9656;</button>
            </div>
        </div>
    );
};