import "./style.css";
import createShip from "./components/createShip.js"
import createGameboard from "./components/createGameboard.js";
import computerPlayerLogic from "./components/computerPlayerLogic.js";
import renderDOM from "./components/renderDOM.js";

console.log("----------------------------------------------------\n\n\n\n\n");
const gameboardOne = createGameboard();
const gameboardTwo = createGameboard();

const container = document.querySelector(".container");
const boardsContainer = document.createElement("div");
const communicationPanel = document.createElement("h1");
const replayButton = document.createElement("button");
container.appendChild(communicationPanel);



const shipOne = createShip(... computerPlayerLogic.getShipData(gameboardOne.getGrid(), 3));

gameboardOne.addShip(shipOne, shipOne.getId());

const shipOneOne = createShip(... computerPlayerLogic.getShipData(gameboardOne.getGrid(), 2));
gameboardOne.addShip(shipOneOne, shipOneOne.getId());

const shipOneOneOne = createShip(... computerPlayerLogic.getShipData(gameboardOne.getGrid(), 5));
gameboardOne.addShip(shipOneOneOne, shipOneOneOne.getId());

const shipTwo = createShip([1, 3], 5, "horizontal");
gameboardTwo.addShip(shipTwo, shipTwo.getId());


const gridOneContainer = document.createElement("div");
gridOneContainer.classList.add("gridSection");


container.appendChild(gridOneContainer);


const gridTwoContainer = document.createElement("div");
gridTwoContainer.classList.add("gridSection");
gridTwoContainer.addEventListener("click", () => gameRound());
container.appendChild(gridTwoContainer);



const gameRound = async () => {/* 
    const target = computerPlayerLogic.getTarget(gameboardOne.getGrid());
    
    gameboardOne.receiveAttack(target);
    */

    gameboardOne.receiveAttack(computerPlayerLogic.getTarget(gameboardOne.getGrid()));
    gridTwoContainer.firstChild != null ? gridTwoContainer.removeChild(gridTwoContainer.firstChild) : {};
    const gridTwo = renderDOM.makeGrid(gameboardTwo.getGrid(), false, gameboardTwo.receiveAttack);
    gridTwoContainer.appendChild(gridTwo);

    await new Promise(resolve => setTimeout(resolve, 1000));

    gridOneContainer.firstChild != null ? gridOneContainer.removeChild(gridOneContainer.firstChild) : {};
    const gridOne = renderDOM.makeGrid(gameboardOne.getGrid(), gameboardOne.receiveAttack);
    gridOneContainer.appendChild(gridOne);

    if (gameboardOne.areAllSunk()) {
        communicationPanel.textContent = "You lost!";
    }
    else if (gameboardTwo.areAllSunk()) {
        communicationPanel.textContent = "You won!";
    }

}
replayButton.textContent = "Replay";
replayButton.addEventListener("click", () => {
    gameboardOne.resetBoard();
    gameboardTwo.resetBoard();


    gridTwoContainer.firstChild != null ? gridTwoContainer.removeChild(gridTwoContainer.firstChild) : {};
    const gridTwo = renderDOM.makeGrid(gameboardTwo.getGrid(), false, gameboardTwo.receiveAttack);
    gridTwoContainer.appendChild(gridTwo);


    gridOneContainer.firstChild != null ? gridOneContainer.removeChild(gridOneContainer.firstChild) : {};
    const gridOne = renderDOM.makeGrid(gameboardOne.getGrid(), gameboardOne.receiveAttack);
    gridOneContainer.appendChild(gridOne);
});
container.appendChild(replayButton);
gameRound();
