let scores = {
    "quas": 30,
    "wex": 50,
    "exort": 60
};

class TestService {
    static getScore(login, setter) {
        if (scores[login] == null) {
            scores[login] = 0;
        }

        setter(scores[login]);
    }

    static setScore(login, newScore) {
        scores[login] = newScore;
    }

    static clean() {
        scores = {
            "quas": 30,
            "wex": 50,
            "exort": 60
        };
    }
}

export default TestService;
