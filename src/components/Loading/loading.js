import { useSelector } from "react-redux"
import { selectIsLoading } from "../../features/Search/SearchSlice"
import { selectIsPlaylistsLoading } from "../Playlists/PlaylistsSlice";
import './loading.css';

export default function Loading() {
    const isLoading = [useSelector(selectIsLoading), useSelector(selectIsPlaylistsLoading)];

    if(isLoading[0] || isLoading[1]) {
        return (
            <div className="loading-screen">
                <div className="loading-overlay"></div>
                <h3>Loading...</h3>
            </div>
        )
    } else {
        return null;
    };
};