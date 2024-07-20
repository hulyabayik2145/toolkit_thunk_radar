export const options = {
    method: 'GET',
    url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
    params: {
        bl_lat: '34.480658',
        bl_lng: '25.73472',
        tr_lat: '42.527912',
        tr_lng: '44.865926',
        limit: '300'
    },
    headers: {
        'x-rapidapi-key': '60d9e600a3msh1475c4a4c947c1fp1c3d62jsn6b4dee0347c6',
        'x-rapidapi-host': 'flight-radar1.p.rapidapi.com'
    }
};

export const headerOpt = {
    headers: {
        "x-rapidapi-key": "60d9e600a3msh1475c4a4c947c1fp1c3d62jsn6b4dee0347c6",
        "x-rapidapi-host": "flight-radar1.p.rapidapi.com",
    },
};