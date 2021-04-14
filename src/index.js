import "./style.css";
import createShip from "./components/createShip.js"
import createGameboard from "./components/createGameboard.js";
import computerPlayerLogic from "./components/computerPlayerLogic.js";
import renderDOM from "./components/renderDOM.js";

console.log("----------------------------------------------------\n\n\n\n\n");
const gameboardOne = createGameboard();
const gameboardTwo = createGameboard();

const shipOne = createShip([3,3], 3, "horizontal");
gameboardOne.addShipToDatabase(shipOne, shipOne.getId());
gameboardOne.addShipToGrid(shipOne.getCoordinatesArray(), shipOne.getId());

const shipOneOne = createShip([0,1], 2, "vertical");
gameboardOne.addShipToDatabase(shipOneOne, shipOneOne.getId());
gameboardOne.addShipToGrid(shipOneOne.getCoordinatesArray(), shipOneOne.getId());

const shipOneOneOne = createShip([7,1], 5, "vertical");
gameboardOne.addShipToDatabase(shipOneOneOne, shipOneOneOne.getId());
gameboardOne.addShipToGrid(shipOneOneOne.getCoordinatesArray(), shipOneOneOne.getId());

const shipTwo = createShip([3,3], 5, "horizontal");
gameboardTwo.addShipToDatabase(shipTwo, shipTwo.getId());
gameboardTwo.addShipToGrid(shipTwo.getCoordinatesArray(), shipTwo.getId());


const container = document.querySelector(".container");
const gridOneContainer = document.createElement("div");
gridOneContainer.classList.add("gridSection");
container.appendChild(gridOneContainer);

const gridTwoContainer = document.createElement("div");
gridTwoContainer.classList.add("gridSection");
container.appendChild(gridTwoContainer);

const gameRound = () => {
    const target = computerPlayerLogic.getTarget(gameboardOne.getGrid());

    gameboardOne.receiveAttack(target);
    
    gameboardTwo.receiveAttack(computerPlayerLogic.getTarget(gameboardTwo.getGrid()));

    
    
    if(gameboardOne.areAllSunk() || gameboardTwo.areAllSunk()) {
        clearInterval(interval);
    }


    
    gridOneContainer.firstChild != null ? gridOneContainer.removeChild(gridOneContainer.firstChild) : {};
    const gridOne = renderDOM.grid(gameboardOne.getGrid());
    gridOneContainer.appendChild(gridOne);

    gridTwoContainer.firstChild != null ? gridTwoContainer.removeChild(gridTwoContainer.firstChild) : {};
    const gridTwo = renderDOM.grid(gameboardTwo.getGrid());
    gridTwoContainer.appendChild(gridTwo);
}

const interval = setInterval(gameRound, 1000);