import { useDispatch, useSelector } from "react-redux";
import {selectPlaylists, loadPlaylists} from '../Playlists/PlaylistsSlice';
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

    return (
        <div>
            <div>
                <h3>Select a playlist to add the song to:</h3>
                {playlists.map(playlist => {
                    return <PlaylistSelect key={playlist.id} playlist={playlist} />
                })}
            </div>
        </div>
    );
};