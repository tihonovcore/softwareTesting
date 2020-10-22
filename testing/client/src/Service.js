import React from 'react';

class Service {
    static getScore(login, setter) {
        let init = {
            method: 'POST',
            body: JSON.stringify({name: login}),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch('/score', init)
            .then(res => res.json()
                .then(json =>
                    setter(json.score)
                )
            )
    }
}

export default Service;
