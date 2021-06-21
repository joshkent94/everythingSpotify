import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSongToPlaylist } from "../../features/Actions/actions";
import { selectAccessToken } from "../../features/Authentication/AuthenticationSlice";
import { loadPlaylistTracks, selectTrackToAdd, setPlaylistSelect, setTrackToAdd } from "../Playlists/PlaylistsSlice";
import './PlaylistSelect.css';

export default function PlaylistSelect(props) {
    const playlist = props.playlist;
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);
    const track = useSelector(selectTrackToAdd);

    useEffect(() => {
        if(playlist.tracks.length === 0) {
            dispatch(loadPlaylistTracks({
                accessToken: accessToken,
                playlist: playlist
            }));
        };
    });

    const handleAddSong = async() => {
        await addSongToPlaylist(playlist, accessToken, track);
        dispatch(setPlaylistSelect(false));
        dispatch(setTrackToAdd(''));
        dispatch(loadPlaylistTracks({
            accessToken: accessToken,
            playlist: playlist
        }));
    };

    return (
        <div id="playlist-select-tile" className="playlist-tile">
            <div className="playlist-description">
                <h5>{playlist.name}</h5>
                <p>Songs: {playlist.tracks.length}</p>
            </div>
            <div className="playlist-buttons">
                <button className="music-button" onClick={handleAddSong}>+</button>
            </div>
        </div>
    );
};