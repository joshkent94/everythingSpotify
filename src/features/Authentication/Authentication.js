import { useDispatch } from "react-redux";
import { authenticate } from "./AuthenticationSlice";
import './Authentication.css';

function Authentication() {
    const dispatch = useDispatch();

    const signIn = () => dispatch(authenticate({isSignedIn: true}));

    return (
        <div className="authenticatePage">
            <button onClick={signIn} className="btn btn-outline-light btn-lg">Sign In</button>
        </div>
    )
};

export default Authentication;