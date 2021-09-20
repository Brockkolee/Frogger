document.addEventListener("DOMContentLoaded", () => {

squares = document.querySelectorAll(".grid div")
//div on square that will be moving left (hardcoded in html)
logLeft = document.querySelectorAll(".log-left")
//div on square that will be moving right (hardcoded in html)
logRight = document.querySelectorAll(".log-right")
//text that will appear when win or lose
text = document.querySelector(".text")

//width of gameboard
width=9
//player position
playerCurrentPostion = 85

squares[playerCurrentPostion].classList.add("player")

//move player
function movePlayer(e) {
    //remove player current position (simulate moving away)
    squares[playerCurrentPostion].classList.remove("player")
    switch (e.key) {
        case "ArrowUp":
            playerCurrentPostion-=width
            break;
        case "ArrowDown":
            playerCurrentPostion+=width
            break;
        case "ArrowLeft":
            playerCurrentPostion-=1
            break;
        case "ArrowRight":
            playerCurrentPostion+=1
            break;
    }
    squares[playerCurrentPostion].classList.add("player")
    gameOver()
 
}

//move log 
function moveLog() {

    onLog()
    logLeft.forEach(element => {
        moveLogLeft(element)
    });
    logRight.forEach(element => {
        moveLogRight(element)
    })
}

//game over if player go on water or reach top row
function gameOver() {
    if (squares[playerCurrentPostion].classList.contains("log4") ||
        squares[playerCurrentPostion].classList.contains("log5")) {
            clearInterval(logId)
            text.textContent = "GameOver! Click to try again"
            text.addEventListener("click",() => {
                location.reload()
            })
        } 
    if (playerCurrentPostion < width) {
            clearInterval(logId)
            text.textContent = "You Win!"
            text.addEventListener("click",() => {
                location.reload()
            })
    }
}

//move log towards the left
function moveLogLeft(logLeft) {

    switch (true) {
        case logLeft.classList.contains("log1"):
            logLeft.classList.remove("log1")
            logLeft.classList.add("log2")
            break;
        case logLeft.classList.contains("log2"):
            logLeft.classList.remove("log2")
            logLeft.classList.add("log3")
            break;
        case logLeft.classList.contains("log3"):
            logLeft.classList.remove("log3")
            logLeft.classList.add("log4")
            break;
        case logLeft.classList.contains("log4"):
            logLeft.classList.remove("log4")
            logLeft.classList.add("log5")
            break;
        case logLeft.classList.contains("log5"):
            logLeft.classList.remove("log5")
            logLeft.classList.add("log1")
            break;
    }

}

//move log towards to right
function moveLogRight(logRight) {
    switch (true) {
        case logRight.classList.contains("log1"):
            logRight.classList.remove("log1")
            logRight.classList.add("log5")
            break;
        case logRight.classList.contains("log5"):
            logRight.classList.remove("log5")
            logRight.classList.add("log4")
            break;
        case logRight.classList.contains("log4"):
            logRight.classList.remove("log4")
            logRight.classList.add("log3")
            break;
        case logRight.classList.contains("log3"):
            logRight.classList.remove("log3")
            logRight.classList.add("log2")
            break;
        case logRight.classList.contains("log2"):
            logRight.classList.remove("log2")
            logRight.classList.add("log1")
            break;
    }
   
}

//if player on the log, move with the log
function onLog() {
    if (squares[playerCurrentPostion].classList.contains("log-left")) {
        squares[playerCurrentPostion].classList.remove("player")
        playerCurrentPostion-=1
        squares[playerCurrentPostion].classList.add("player")
    } else if (squares[playerCurrentPostion].classList.contains("log-right")) {
        squares[playerCurrentPostion].classList.remove("player")
        playerCurrentPostion+=1
        squares[playerCurrentPostion].classList.add("player")
    } 
}



logId = setInterval(moveLog,500)
document.addEventListener("keyup",movePlayer)

})