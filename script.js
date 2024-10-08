// Getting Elements
const boxes = document.querySelectorAll(".box");




//  Creating Functions
let clickCount = 0;
let gameStart = false
let playerOneScore = 0;
let playerTwoScore = 0;
let playerOneMoves = [];
let playerTwoMoves = [];
const playerOneScoreEle = document.querySelector(".player_one_score");
const playerTwoScoreEle = document.querySelector(".player_two_score");
const playBtn = document.querySelector(".play_btn");
const resetBtn = document.querySelector(".reset_btn");

const winningSets = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 5, 7], [3, 6, 9], [4, 5, 6]]


function startGame() {
    gameStart = true;
    console.log(gameStart);

}


function getBoxMoveId(e) {


    if (gameStart) {
        let selectedBoxId = parseInt(e.target.dataset.key);

        if (clickCount >= 9 || !gameStart) {
            return
        }

        if (playerOneMoves.includes(selectedBoxId) || playerTwoMoves.includes(selectedBoxId)) {
            return
        }

        if (clickCount % 2 == 0 || clickCount == 0) {
            playerOneMoves.push(selectedBoxId)
        } else if (clickCount % 2 == 1 || !playerOneMoves.includes(selectedBoxId) || !playerTwoMoves.includes(selectedBoxId)) {
            playerTwoMoves.push(selectedBoxId)

        }
        if (clickCount >= 4) {
            playerOneMoves.sort();
            playerTwoMoves.sort();
            const matchingSetOne = winningSets.find((set)=> set.every(num=> playerOneMoves.includes(num)));
            const matchingSetTwo = winningSets.find((set)=> set.every(num=> playerTwoMoves.includes(num)));
            // console.log("Matching Set One", matchingSetOne);
            // console.log("Matching Set Two", matchingSetTwo);
            
            let playerOneWin = winningSets.some(set => set.every(num => playerOneMoves.includes(num)));
            let playerTwoWin = winningSets.some(set => set.every(num => playerTwoMoves.includes(num)));
            if (playerOneWin) {
                playerOneScore++;
                playerOneScoreEle.innerHTML = playerOneScore;
                boxes.forEach((box, id)=> {
                    if (matchingSetOne.includes(id+1)) {
                        box.classList.add("bg-green-500")
                    }
                })
                gameStop();
            } else if (playerTwoWin) {
                playerTwoScore++;
                playerTwoScoreEle.innerHTML = playerTwoScore;
                boxes.forEach((box, id)=> {
                    if (matchingSetTwo.includes(id+1)) {
                        box.classList.add("bg-green-500")
                    }
                })
                gameStop();

            }

            // console.log("Player one moves", winningSets.some(set=> set.every(num => playerOneMoves.includes(num))) );

        }

        boxes.forEach((box, id) => {
            if ((selectedBoxId - 1) == id) {
                if (clickCount % 2 == 0 || clickCount == 0) {
                    box.innerHTML = "X"
                } else if (clickCount % 2 == 1) {
                    box.innerHTML = "O"

                }
            }
        })
        // console.log("Selected box", selectedBoxId);


        clickCount++;
        console.log("Player One ", playerOneMoves);
        console.log("Player Two ", playerTwoMoves);
        console.log("Player Click Count ", clickCount);

    } else {
        alert("start the game by clicking Play Game")
    }

}



function gameStop() {
    boxes.forEach(box => box.disabled = true)
    playerOneMoves = [];
    playerTwoMoves = [];
    gameStart = false;
}
function resetGame() {
    playerOneMoves = [];
    playerTwoMoves = [];
    gameStart = true;
    boxes.forEach((box) => { 
        box.disabled = false;
        box.innerHTML = ""
        box.classList.remove("bg-green-500")
    })
    clickCount = 0;


}

// Calling Functions
playBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame)
boxes.forEach((box) => box.addEventListener("click", (e) => getBoxMoveId(e)))

