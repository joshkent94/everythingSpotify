import Tracklist from "../Tracklist/tracklist";
import './Music.css';

export default function Music() {
    return (
        <div>
            <div className="heading">
                <h1>How about some music?</h1>
                <h3>Search, play and save your favourite songs</h3>
                <p>
                    Music will play on whichever device you last played Spotify,
                    make sure to open Spotify on your device of choice and play a song
                </p>
            </div>
            <Tracklist />
        </div>
    );
};