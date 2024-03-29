const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");
const tictactoe = document.querySelector(".tic-tac-toe");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame() 
{
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    tictactoe.classList.add("active");
    tictactoe.classList.remove("winner");
}

initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        newGameBtn.innerText = "Reset"
        newGameBtn.classList.add("active");
        handleClick(index);
    })
});

function handleClick(index)
{
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

function swapTurn()
{
    if(currentPlayer === "X")
    {
        currentPlayer = "O";
    }
    else
    {
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener("click", () => {
    initGame();
})

function checkGameOver()
{
    let answer = "";

    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) )
        {
            
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O"


            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });

    if(answer !== "")
    {
        gameInfo.innerText = `Player - ${answer} Wins`;
        newGameBtn.innerText = "New Game";
        newGameBtn.classList.remove("active");
        newGameBtn.classList.add("active");
        tictactoe.classList.remove("active");
        tictactoe.classList.add("winner");
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++
    })

    if(fillCount === 9)
    {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.remove("active");
        newGameBtn.innerText = "New Game";
        newGameBtn.classList.add("active");
        tictactoe.classList.remove("active");
    }
}