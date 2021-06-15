import { useSelector } from "react-redux";
import { selectClientId, selectRedirectUri, selectAccessToken } from "./AuthenticationSlice";
import './Authentication.css';

export default function Authentication() {
    const accessToken = useSelector(selectAccessToken);
    const clientId = useSelector(selectClientId);
    const redirectUri = useSelector(selectRedirectUri);
    const scopes = 'playlist-modify-public user-read-playback-state user-modify-playback-state user-top-read user-library-modify playlist-read-private playlist-read-collaborative';

    const signIn = () => {
        if(accessToken) {
            return;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(scopes)}&redirect_uri=${redirectUri}`;
        };
    };

    return (
        <div className="authenticatePage">
            <button onClick={signIn} className="btn btn-outline-light">Sign In</button>
            <div className="overlay"></div>
        </div>
    )
};