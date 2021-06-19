export const playSong = async(track, accessToken) => {
    const playbackDetails = await checkPlayback(accessToken);
    let deviceId;
    let trackId;
    let pausePoint;

    if(playbackDetails) {
        deviceId = playbackDetails[0];
        trackId = playbackDetails[1];
        pausePoint = playbackDetails[2];
    };

    if(deviceId && trackId === track.id) {
        try {
            const urlToSend = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;
            await fetch(urlToSend, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    uris: [track.uri],
                    position_ms: pausePoint
                })
            });
            return true;
        } catch(error) {};
    }
    
    else if (deviceId) {
        try {
            const urlToSend = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;
            await fetch(urlToSend, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    uris: [track.uri]
                })
            });
            return true;
        } catch(error) {};
    }
    
    else {
        return false;
    };
};

export const pauseSong = async(accessToken) => {
    try {
        const urlToSend = `https://api.spotify.com/v1/me/player/pause`;
        await fetch(urlToSend, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        throw new Error('An error occurred');
    } catch(error) {};
};

export const saveSong = async(accessToken, trackId) => {
    try {
        const urlToSend = `https://api.spotify.com/v1/me/tracks?ids=${trackId}`;
        await fetch(urlToSend, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        throw new Error('An error occurred');
    } catch(error) {};
};

export const checkPlayback = async(accessToken) => {
    let playbackDetails = [];

    try {
        const urlToSend = `https://api.spotify.com/v1/me/player`;
        const response = await fetch(urlToSend, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        if(response.ok) {
            const jsonResponse = await response.json();
            playbackDetails.push(jsonResponse.device.id);
            playbackDetails.push(jsonResponse.item.id);
            playbackDetails.push(jsonResponse.progress_ms);
            if(playbackDetails) {
                return playbackDetails;
            };
        };
        throw new Error('An error occurred');
    } catch(error) {};
};

export const playPlaylist = async(playlist, accessToken) => {
    const playbackDetails = await checkPlayback(accessToken);
    let deviceId;

    if(playbackDetails) {
        deviceId = playbackDetails[0];
    };

    if (deviceId) {
        try {
            const urlToSend = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;
            const playlistUris = playlist.tracks.map(track => {
                return track.uri;
            });
            await fetch(urlToSend, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    uris: playlistUris
                })
            });
            return true;
        } catch(error) {};
    }
    
    else {
        return false;
    };
};