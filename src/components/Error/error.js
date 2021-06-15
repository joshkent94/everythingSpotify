import { useHistory } from 'react-router-dom';
import './error.css';

export default function Error() {
    const history = useHistory();

    const backToSignIn = () => {
        history.push(`/`);
        window.location.reload();
    };

    return (
        <div className="error-page">
            <h3>Oops, looks like there's been an error!</h3>
            <button className="btn btn-dark btn-lg" onClick={backToSignIn}>Back to sign in</button>
        </div>
    );
};