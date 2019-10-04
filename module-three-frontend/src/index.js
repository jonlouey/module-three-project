const USER_URL = "http://localhost:3000/users";
const userForm = document.querySelector("#user-login");
userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let userName = userForm.querySelector("#user-name").value
    let userInfo = {name: userName};
    if (userName !== ""){
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
    }
    else{
        alert("Please input your name.")
    }

})
   

function renderGame(){
    const body = document.querySelector("body")
    body.innerHTML = ""
    const gameContainer = document.createElement("div")
    gameContainer.className = "game-container"
    const string = `
    <div id="game-title">
    <h1 id="page-title">So, you think you are smart?</h1>
    <div id=game-out-container>
    <button id="game-out" type="button" onClick="window.location.reload();">New User</button>
    </div>
    </div>
    <div id="game-card">
    <div id="game-question-title"><h3>What is the capital of...</h3></div> 
    <div id="game-question"><ul id="game-question-ul"></ul></div>
    <div id="game-form">
        <form id="game-submission">
            <input type="text" id="user-input" disabled>
            <input type="submit" id="user-submit">
        </form>
        <button id="game-start">Start</button>
    </div>
    <div id="game-instructions">
    <p>Instructions: List all of the state capitals before the timer runs out. The timer will start after you press the start button. If you submit a correct capital, the state will be removed from the list. You do not need to list the capitals in order.</p></div>
    </div>
    <div id="game-sidebar">
    <div id="game-timer">
                <h3>Time Left</h3>
                <span class="metric" id="timer">60 seconds<span>
    </div>

    <div id="game-score">
                <span id=score-title><h3>Score</h3></span>
                <span class="metric" id="points">0 Points</span>
    </div>

    <div id="game-highscore">
        <h3>High Scores</h3>
        <ol class="metric"></ol>
    </div>
    </div>  
    `
    gameContainer.innerHTML = string
    body.append(gameContainer)
    gameAction()
    populateQuestion()
    populateHs()
    userText()
}

function userText(){
    let userInput = document.querySelector('#user-input')
    if(userInput.disabled) { userInput.placeholder = "Press Start to Play" }
}

function populateHs(){
    fetch('http://localhost:3000/games')
    .then(resp => resp.json())
    .then(function(games){
        addToHs(games)
    })
}
 function addToHs(arr){
    let hsCont = document.querySelector("#game-highscore > ol")
    hsCont.innerHTML = ""
    arr.forEach(function(element){
        let ulList = `<li>${element.name}: ${element.score}</li>`
        hsCont.insertAdjacentHTML('beforeend', ulList)
    })
 }

 function addCurrentHS(user){
    let hsCont = document.querySelector("#game-highscore > ol");
    let score = parseInt(document.querySelector("#points"));
    let ulList = `<li>${user}: ${score}</li>`
    hsCont.insertAdjacentHTML('beforeend', ulList)
 }


function gameAction() {
    const gameForm = document.querySelector("#game-form")
    gameForm.addEventListener("click", function (e) {
        if (e.target === document.querySelector("#game-start") && e.target.innerText === "Start") {
            document.querySelector("#user-input").disabled = false
            document.querySelector("#user-submit").disabled = false
            document.querySelector('#user-input').placeholder = "Time to Play"
            time = setInterval(timer, 1000)
            gameOver()
            e.target.innerText = "Reset"
        } else if (e.target === document.querySelector("#game-start") && e.target.innerText === "Reset") {
            e.target.innerText = "Start"
            document.querySelector("#user-input").disabled = true
            let timeSpan = document.querySelector('#timer');
            timeSpan.innerText = "60 seconds"
            document.querySelector("#game-question-ul").innerText = ""
            document.querySelector("#points").innerText= "0 Points"
            changeButtons()
            populateQuestion()
            clearInterval(time)
        } 
    })
    document.querySelector('#game-submission').addEventListener("submit", function (e) {
        if (e.target.id === "game-submission") {
            e.preventDefault()
            let answer = document.querySelector("#user-input").value
            if (states[answer] !== undefined) {
                let stateli = document.querySelector(`[data-id="${states[answer][1]}"]`)
                stateli.innerText = ""
                document.querySelector("#user-input").value = ""
                incrementPoints()
            } else {
                document.querySelector("#user-input").classList.add("apply-shake")
                document.querySelector("#user-input").value = ""
                document.querySelector("#user-input").addEventListener("animationend", (e) => {
                    document.querySelector("#user-input").classList.remove("apply-shake");
                });
            }
        }
    })
}

function gameOver() {
    const questionLis = document.querySelector("#game-question").children
    if (questionLis.length === 0 || document.querySelector('#timer').innerText === "0 seconds") {
        let currentScore = parseInt(document.querySelector("#points").innerText)
        changeButtons()
        postInfo()
        populateHs()
        clearInterval(time)
        alert(`Your Current Score is ${currentScore}`)
        renderGame()
    }
    // } else if (questionLis.length === 0 && document.querySelector('#timer').innerText !== "0 seconds") {
    //     changeButtons()
    //     postInfo()
    // } else if (questionLis.length !== 0 && document.querySelector('#timer').innerText !== "0 seconds") {
    //     changeButtons()
    //     postInfo()
    // }
}

function changeButtons() {
    document.querySelector("#user-submit").disabled = true
    document.querySelector("#game-start").innerText = "Start"
}



const timer = function () {
    let timeSpan = document.querySelector('#timer');
    let seconds = parseInt(timeSpan.innerText);
    seconds -= 1;
    timeSpan.innerText = `${seconds} seconds`
    if (seconds === 0) {
        gameOver()
    }
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
        document.querySelector("#game-question-ul").insertAdjacentHTML("beforeEnd",
        `<li data-id=${states[capital][1]}>${states[capital][0]}</li>
        `)
      }
}

// function populateQuestion(){
// var keys = Object.keys(states);

// for (var i=1; i< 13; i++) { 
//     document.querySelector("#game-question").insertAdjacentHTML("beforeEnd",
//         `<ul data-id=${states[keys[i]][1]}>${states[keys[i]][0]}</ul>
//         `)
//  }

//  for (var i=14; i< 26; i++) { 
//     document.querySelector("#game-question-2").insertAdjacentHTML("beforeEnd",
//         `<ul data-id=${states[keys[i]][1]}>${states[keys[i]][0]}</ul>
//         `)
//  }

//  for (var i=27; i< 39; i++) { 
//     document.querySelector("#game-question-3").insertAdjacentHTML("beforeEnd",
//         `<ul data-id=${states[keys[i]][1]}>${states[keys[i]][0]}</ul>
//         `)
//  }

//  for (var i=40; i< 50; i++) { 
//     document.querySelector("#game-question-4").insertAdjacentHTML("beforeEnd",
//         `<ul data-id=${states[keys[i]][1]}>${states[keys[i]][0]}</ul>
//         `)
//  }


// }   


function incrementPoints(){
    const score = document.querySelector("#points")
    let newScore = parseInt(score.innerText) + 1
    score.innerText = newScore + " Points"
}


currentUser()
let current;
function postInfo() {
    let score = parseInt(document.querySelector("#points").innerText);
    let category = 1;
    let obj = { user_id: current + 1, category_id: category, score: score }
    fetch("http://localhost:3000/games", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(resp => resp.json())
}


function currentUser() {
    fetch(USER_URL)
        .then(resp => resp.json())
        .then(user => current = user.id)
}







modal()
function modal() {
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


