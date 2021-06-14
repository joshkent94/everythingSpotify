export const playSong = async(track, accessToken) => {
    let deviceId;

    try {
        const urlToSend = `https://api.spotify.com/v1/me/player`;
        const response = await fetch(urlToSend, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        if(response.ok) {
            const jsonResponse = await response.json();
            deviceId = jsonResponse.device.id;
        };
        throw new Error('An error occurred');
    } catch(error) {};

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
        throw new Error('An error occurred');
    } catch(error) {};
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