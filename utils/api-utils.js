var ApiUtils = {
    authenticate: function (userData) {
        return new Promise((resolve, reject) => {fetch('/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userData.userName,
                password: userData.password
            }),
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw new Error('Bad response status: ' + response.status);
                }
            }) .then(function (json) {
                console.log('parsed json', json);
                 resolve(json);
            })
            .catch(error => { console.log('request failed', error); });
    });}
};

module.exports = ApiUtils;