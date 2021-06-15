export default function Playlist(props) {
    const playlist = props.playlist;

    return (
        <div className="tile">
            <div>
                <h5>{playlist.name}</h5>
            </div>
            <div className="buttons">
                <button className="music-button">&#9656;</button>
            </div>
        </div>
    );
};