import { useSelector } from "react-redux";
import { selectSearchResults } from "../../features/Search/SearchSlice";
import Track from '../Track/track';
import './tracklist.css';

export default function Tracklist() {
    let tracks = useSelector(selectSearchResults);

    return (
        <div className="track-area">
            {tracks.map(track => {
                return <Track key={track.id} track={track} />
            })}
        </div>
    );
};