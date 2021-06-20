import { useDispatch, useSelector } from "react-redux";
import {selectPlaylists, loadPlaylists, setPlaylistSelect, setTrackToAdd} from '../Playlists/PlaylistsSlice';
import './AddSongToPlaylist.css';
import PlaylistSelect from "../PlaylistSelect/PlaylistSelect";
import { selectAccessToken } from "../../features/Authentication/AuthenticationSlice";
import { useEffect } from "react";

export default function AddSongToPlaylist() {
    const playlists = useSelector(selectPlaylists);
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);

    useEffect(() => {
        if(playlists.length === 0) {
            dispatch(loadPlaylists({accessToken: accessToken}));
        };
    });

    const cancelAdd = () => {
        dispatch(setPlaylistSelect(false));
        dispatch(setTrackToAdd(''));
    };

    return (
        <div className="add-to-playlist">
            <div className="add-to-playlist-heading">
                <h3>Select a playlist to add the song to:</h3>
                <button className="back-button" onClick={cancelAdd}>&#129044;</button>
            </div>
                {playlists.map(playlist => {
                    return <PlaylistSelect key={playlist.id} playlist={playlist} />
                })}
        </div>
    );
};