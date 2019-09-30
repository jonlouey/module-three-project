const USER_URL = "http://localhost:3000/users";
const userForm = document.querySelector("#user-login");
userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let userName = userForm.querySelector("#user-name").value
    let userInfo = {name: userName};
    fetch(USER_URL, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(resp => resp.json())
    .then(renderGame)
})


function renderGame(){
    const body = document.querySelector("body")
    body.innerHTML = ""
    const gameContainer = document.createElement("div")
    gameContainer.className = "game-container"
    const string = `
        <div id="game-title">
        <h1>Do you think you are smart?</h1>
        </div>
        <div id="game-card">
        <div id="game-question-title"><h3>What is capital of...</h3></div>   
        <div id="game-question"></div>
        <div id="game-form">
            <form id="game-submission">
                <input type="text" id="user-input">
                <input type="submit" id="user-submit">
            </form>
            <button id="game-start">Start</button>
        </div>
        </div>
        <div id="game-sidebar">
        <div id="game-timer">
            timer
        </div>

        <div id="game-score">
            <span>0 Points</span>
        </div>

        <div id="game-highscore">
            high score
        </div>
        </div>
    `
    gameContainer.innerHTML = string
    body.append(gameContainer)
    gameAction()
}

function gameAction() {
    const gameForm = document.querySelector("#game-form")
    gameForm.addEventListener("click",function(e){
        if(e.target.innerText === "Start"){
            populateQuestion()
            e.target.innerText = "Stop"
        }
    })
    document.querySelector('#game-submission').addEventListener("submit", function(e){
        if(e.target.id === "game-submission"){
            e.preventDefault()
            let answer = document.querySelector("#user-input").value
            let state = document.querySelector("#user-input").parentElement
        }
    })
}

function populateQuestion(){
    fetch('http://localhost:3000/questions')
    .then(function(response){
        return response.json()
    })
    .then(function(question){
        document.querySelector("#game-question").insertAdjacentHTML("afterbegin",
        `<li data-id = ${question.id}>${question.question}</li>
        `)
    })
}
