import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../../features/Authentication/AuthenticationSlice";
import { loadFavourites } from "../../features/Search/SearchSlice";
import { selectSearchResults } from "../../features/Search/SearchSlice";
import Track from '../Track/track';
import './tracklist.css';

export default function Tracklist() {
    let tracks = useSelector(selectSearchResults);
    const accessToken = useSelector(selectAccessToken);
    const dispatch = useDispatch();

    const fetchFavourites = () => {
        dispatch(loadFavourites({
            accessToken: accessToken
        }));
    };

    useEffect(() => {
        if(tracks.length === 0) {
            fetchFavourites();
        };
    });

    return (
        <div className="track-area">
            {tracks.map(track => {
                return <Track key={track.id} track={track} />
            })}
        </div>
    );
};