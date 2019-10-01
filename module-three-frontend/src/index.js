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
            <input type="submit" id="game-start" value="Clear">
        </form>
        <button id="game-start">Start</button>
    </div>
    </div>
    <div id="game-sidebar">
    <div id="game-timer">
        Timer
    </div>

    <div id="game-score">
        <span id=score-title>Score</span>
        <br>
        <br>
        <br>
        <span id=points>0 Points</span>
    </div>

    <div id="game-highscore">
        High Scores
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
            if (states[answer] !== undefined){
                let stateli = document.querySelector(`[data-id="${states[answer][1]}"]`)
                stateli.remove()
                document.querySelector("#user-input").value = ""
                incrementPoints()
            } else {
                alert("Your answer is not a capital.")
                document.querySelector("#user-input").value = ""
            } 
        }
    })
}

const states = {}

function populateStates(){
    fetch('http://localhost:3000/questions')
    .then(function(response){
        return response.json()
    })
    .then(function(questions){
        questions.forEach(function(question){
            states[question.answer] = [question.question, question.id]
        })
    })
}

populateStates()

function populateQuestion(){
    for (let capital in states) {
        document.querySelector("#game-question").insertAdjacentHTML("beforeEnd",
        `<li data-id=${states[capital][1]}>${states[capital][0]}</li>
        `)
      }
}

function incrementPoints(){
    const score = document.querySelector("#points")
    let newScore = parseInt(score.innerText) + 1
    score.innerText = newScore + " Points"
}
