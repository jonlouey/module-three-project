class APIComunicator {
    constructor(){
        this.startpoint = "http://localhost:3000/users";
        this.endpoint = "http://localhost:3000/games";
        this.currentUser;
    }

    // get current user
    get currentUser() {
        return fetch(this.startpoint)
            .then(convertToJSON)
            .then(user => this.currentUser = user.id + 1)
    }

    // post to the USER
    static postUser(userName){
        let userInfo = { name: userName }
        return fetch(this.startpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then(this.convertToJSON)
    }

    // post to the GAME
    static postUserStats(user_id, category_id=1, score){
        let userInfo = { user_id: user_id, category_id: category_id, score: score }
        return fetch(this.startpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then(convertToJSON)
    }
    
    // get the TOP HS
    static highscores(){
        fetch('http://localhost:3000/games')
        .then(convertToJSON)
        .then(function (games) {
            Games.push(gam)
        })
    }

    convertToJSON(response){
        return response.json()
    }
}
const games = []