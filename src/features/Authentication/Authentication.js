import { useSelector } from "react-redux";
import { selectAuthentication } from "./AuthenticationSlice";
import './Authentication.css';

export default function Authentication() {
    const authState = useSelector(selectAuthentication);

    const signIn = (authState) => {
        return () => {
            if(authState.accessToken) {
                return;
            } else {
                window.location = `https://accounts.spotify.com/authorize?client_id=${authState.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${authState.redirectUri}`;
            };
        };
    };

    return (
        <div className="authenticatePage">
            <button onClick={signIn(authState)} className="btn btn-outline-light">Sign In</button>
            <div className="overlay"></div>
        </div>
    )
};