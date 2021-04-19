import "./style.css";
import createShip from "./components/createShip.js"
import createGameboard from "./components/createGameboard.js";
import computerPlayerLogic from "./components/computerPlayerLogic.js";
import renderDOM from "./components/renderDOM.js";

console.log("----------------------------------------------------\n\n\n\n\n");

const container = document.querySelector(".container");
const communicationPanel = document.createElement("h1");
const replayButton = document.createElement("button");
container.appendChild(communicationPanel);


const gameboardOne = createGameboard();
const gameboardTwo = createGameboard();

const gridOneContainer = document.createElement("div");
gridOneContainer.classList.add("gridSectionOne");
gridOneContainer.classList.add("gridSection");

const gridTwoContainer = document.createElement("div");
gridTwoContainer.classList.add("gridSectionTwo");
gridTwoContainer.classList.add("gridSection");


container.appendChild(gridOneContainer);
container.appendChild(gridTwoContainer);

//computer ship placement
const shipTwo = createShip(...computerPlayerLogic.getShipData(gameboardTwo.getGrid(), 3));
gameboardTwo.addShip(shipTwo, shipTwo.getId());
const shipTwoTwo = createShip(...computerPlayerLogic.getShipData(gameboardTwo.getGrid(), 2));
gameboardTwo.addShip(shipTwoTwo, shipTwoTwo.getId());
const shipTwoTwoTwo = createShip(...computerPlayerLogic.getShipData(gameboardTwo.getGrid(), 5));
gameboardTwo.addShip(shipTwoTwoTwo, shipTwoTwoTwo.getId());


//player ship placement
const shipPlacementDiv = renderDOM.makeShipPlacementDiv(createShip, gameboardOne.addShip, gridOneContainer);

shipPlacementDiv.then(promise => {
    container.appendChild(promise);
    gridTwoContainer.addEventListener("click", () => gameRound());
})


const gridOne = renderDOM.makeGrid(gameboardOne.getGrid(), true);
gridOneContainer.appendChild(gridOne);
console.table(gameboardTwo.getGrid());
const gridTwo = renderDOM.makeGrid(gameboardTwo.getGrid(), false);
gridTwoContainer.appendChild(gridTwo);






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
    const gridOne = renderDOM.makeGrid(gameboardOne.getGrid(), true);
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
    const gridOne = renderDOM.makeGrid(gameboardOne.getGrid(), true, gameboardOne.receiveAttack);
    gridOneContainer.appendChild(gridOne);
});
container.appendChild(replayButton);
