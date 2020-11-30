import React from 'react';

class BE_Service {
    static getScore(login, setter) {
        fetch('/score?userName=' + login, { method: 'GET' })
            .then(res => res.text().then(text => setter(parseInt(text))))
    }

    static setScore(login, newScore) {
        let init = { method: 'POST' }
        fetch('/update?userName=' + login + "&newScore=" + newScore, init)
    }
}

export default BE_Service;
