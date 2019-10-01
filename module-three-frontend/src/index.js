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
        <!-- <button id="game-start">Start</button> -->
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
            let stateLi = document.querySelector('#game-question').children[document.querySelector('#game-question').children.length - 1]
            let state = stateLi.innerText
            let answerBool = checkAnswer(state, answer)
            if (answerBool){
                stateLi.style.color = "Green";
                document.querySelector("#user-input").value = ""
                populateQuestion()
                incrementPoints()
            } else {
                stateLi.style.color = "red";
                document.querySelector("#user-input").value = ""
                populateQuestion()
                decrementPoints()
            }
        }
    })
}

const states = []

function populateQuestion(){
    fetch('http://localhost:3000/questions')
    .then(function(response){
        return response.json()
    })
    .then(function(question){
        document.querySelector("#game-question").insertAdjacentHTML("beforeEnd",
        `<li data-id = ${question.id}>${question.question}</li>
        `)
        states.push(question)
    })
}

function checkAnswer(state, answer){
    let question = states.find(function(ele){
        if (ele.question === state) {
            return ele
        }
    })
    return question.answer === answer
}

function incrementPoints(){
    const score = document.querySelector("#game-score > span")
    let newScore = parseInt(score.innerText) + 10
    score.innerText = newScore + " Points"
}

function decrementPoints(){
    const score = document.querySelector("#game-score > span")
    let newScore = parseInt(score.innerText) - 10
    score.innerText = newScore + " Points"
}
