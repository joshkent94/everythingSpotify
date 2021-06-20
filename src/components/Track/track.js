import { useDispatch, useSelector } from "react-redux";
import { playSong, pauseSong, saveSong } from "../../features/Actions/actions";
import {selectAccessToken} from '../../features/Authentication/AuthenticationSlice';
import {setRejected} from '../../features/Search/SearchSlice';
import { setPlaylistSelect, setTrackToAdd } from "../Playlists/PlaylistsSlice";
import './track.css';

export default function Track(props) {
    const track = props.track;
    const accessToken = useSelector(selectAccessToken);
    const dispatch = useDispatch();

    const sendPlayRequest = async() => {
        if(await playSong(track, accessToken)) {
            return;
        } else {
            dispatch(setRejected(true));
        };
    };

    const sendPauseRequest = () => {
        pauseSong(accessToken);
    };

    const sendSaveRequest = () => {
        saveSong(accessToken, track.id);
    };

    const setTrackToAddDetails = () => {
        dispatch(setPlaylistSelect(true));
        dispatch(setTrackToAdd(track.uri));
    };

    return (
        <div className="tile">
            <div className="track-info">
                <h5>{track.name}</h5>
                <p>{track.artist} | {track.album}</p>
            </div>
            <div className="buttons">
                <button id="save" className="music-button" onClick={sendSaveRequest}>&#9825;</button>
                <button className="music-button" onClick={setTrackToAddDetails}>+</button>
                <button className="music-button" onClick={sendPlayRequest}>&#9656;</button>
                <button className="pause music-button" onClick={sendPauseRequest}></button>
            </div>
        </div>
    );
};