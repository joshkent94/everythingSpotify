import { useSelector } from "react-redux";
import { selectClientId, selectRedirectUri, selectAccessToken } from "./AuthenticationSlice";
import './Authentication.css';

export default function Authentication() {
    const accessToken = useSelector(selectAccessToken);
    const clientId = useSelector(selectClientId);
    const redirectUri = useSelector(selectRedirectUri);

    const signIn = (accessToken) => {
        return () => {
            if(accessToken) {
                return;
            } else {
                window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            };
        };
    };

    return (
        <div className="authenticatePage">
            <button onClick={signIn(accessToken)} className="btn btn-outline-light">Sign In</button>
            <div className="overlay"></div>
        </div>
    )
};