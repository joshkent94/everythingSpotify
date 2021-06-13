import { useSelector } from "react-redux";
import { playSong, pauseSong } from "../../features/Play/play";
import {selectAccessToken} from '../../features/Authentication/AuthenticationSlice';
import './track.css';

export default function Track(props) {
    const track = props.track;
    const accessToken = useSelector(selectAccessToken);

    const sendPlayRequest = () => {
        return () => {
            playSong(track, accessToken);
        };
    };

    const sendPauseRequest = () => {
        return () => {
            pauseSong(accessToken);
        };
    };

    return (
        <div className="tile">
            <div className="track-info">
                <h5>{track.name}</h5>
                <p>{track.artist} | {track.album}</p>
            </div>
            <div className="buttons">
                <button className="music-button">+</button>
                <button className="music-button" onClick={sendPlayRequest()}>&#9656;</button>
                <button className="pause music-button" onClick={sendPauseRequest()}></button>
            </div>
        </div>
    );
};