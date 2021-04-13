import createShip from "./src/components/createShip.js"
import createGameboard from "./src/components/createGameboard.js";
import computerPlayerLogic from "./src/components/computerPlayerLogic.js";

console.log("----------------------------------------------------");
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


const gameRound = () => {
    const target = computerPlayerLogic.getTarget(gameboardOne.getGrid());

    gameboardOne.receiveAttack(target);
    console.table(gameboardOne.getGrid());
    
    gameboardTwo.receiveAttack(computerPlayerLogic.getTarget(gameboardTwo.getGrid()));
    console.table(gameboardTwo.getGrid());

    
    
    if(gameboardOne.areAllSunk() || gameboardTwo.areAllSunk()) {
        console.log("gameboard one:", gameboardOne.areAllSunk());
        console.log("gameboard two:", gameboardTwo.areAllSunk());
        clearInterval(interval);
        console.log("gameover");
    }


}

const interval = setInterval(gameRound, 100);





