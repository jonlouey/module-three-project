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
    <h1>So, you think you are smart?</h1>
    </div>
    <div id="game-card">
    <div id="game-question-title"><h3>What is the capital of...</h3></div> 
    <div id="game-question"><ul id="game-question-ul"></ul></div>
    <div id="game-form">
        <form id="game-submission">
            <input type="text" id="user-input">
            <input type="submit" id="user-submit">
        </form>
        <button id="game-start">Start</button>
    </div>
    <div id="game-instructions"><p>Instructions: List all of the state capitals before the timer runs out. The timer will start after you submit the first capital. If you submit a correct capital, the state will be removed from the list. You do not need to list the capitals in order.</p></div>
    </div>
    <div id="game-sidebar">
    <div id="game-timer">
                Time Left
                <br>
                <span id="timer">15 seconds<span>
    </div>

    <div id="game-score">
                <span id=score-title><h3>Score</h3></span>
                <br>
                <br>
                <br>
                <span id=points>0 Points</span>
    </div>

    <div id="game-highscore">
        <h3>High Scores</h3>
    </div>
    </div>  
    `
    gameContainer.innerHTML = string
    body.append(gameContainer)
    gameAction()
    populateQuestion()
}

function gameAction() {
    const gameForm = document.querySelector("#game-form")
    gameForm.addEventListener("click", function (e) {
        if (e.target.innerText === "Start") {
            time = setInterval(timer, 1000)
            gameOver()
            e.target.innerText = "Reset"
        } else if (e.target.innerText === "Reset") {
            e.target.innerText = "Start"
            let timeSpan = document.querySelector('#timer');
            timeSpan.innerText = "60 seconds"
            document.querySelector("#game-question").innerText = ""
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
                alert("Your answer is not a capital.")
                document.querySelector("#user-input").value = ""
            }
        }
    })
}

function gameOver() {
    const questionLis = document.querySelector("#game-question").children
    if (questionLis.length === 0 || document.querySelector('#timer').innerText === "0 seconds") {
        changeButtons()
        postInfo()
        clearInterval(time)
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


