const gameboard = () => {
    let grid = [
        [
            '', '', '', '', '',
            '', '', '', ''
        ],
        [
            '', '', '', '', '',
            '', '', '', ''
        ],
        [
            '', '', '', '', '',
            '', '', '', ''
        ],
        [
            '', '', '', '', '',
            '', '', '', ''
        ],
        [
            '', '', '', '', '',
            '', '', '', ''
        ],
        [
            '', '', '', '', '',
            '', '', '', ''
        ],
        [
            '', '', '', '', '',
            '', '', '', ''
        ],
        [
            '', '', '', '', '',
            '', '', '', ''
        ],
        [
            '', '', '', '', '',
            '', '', '', ''
        ]
    ];
    const getGrid = () => {
        return grid;
    }
    const shipsDatabase = {};

    const addShipToGrid = (coordinatesArray, id) => {
        if (coordinatesArray.findIndex(pair => pair[0] >= 9 || pair[1] >= 9) !== -1) {
            return
        }
        coordinatesArray.forEach(coordinatePair => {
            grid[coordinatePair[1]][coordinatePair[0]] = id;
        });


    }

    const receiveAttack = ([x, y]) => {
        const cell = grid[y][x]
        if (cell !== "" && cell !== "B" && cell !== "D") {
            const ship = shipsDatabase[cell];
            ship.hit(x, y);
            grid[y][x] = "B";

            if (ship.isSunk()) {
                ship.getCoordinatesArray().forEach(pair => {
                    const col = pair[0];
                    const row = pair[1];
                    const adjacentCells = []
                    adjacentCells.push([col + 1, row + 1]);
                    adjacentCells.push([col + 1, row + 0]);
                    adjacentCells.push([col + 1, row - 1]);
                    adjacentCells.push([col + 0, row + 1]);
                    adjacentCells.push([col + 0, row - 1]);
                    adjacentCells.push([col - 1, row + 1]);
                    adjacentCells.push([col - 1, row + 0]);
                    adjacentCells.push([col - 1, row - 1]);
                    adjacentCells.forEach(pairAdj => {
                        if (grid[pairAdj[1]][pairAdj[0]] === "") {
                            grid[pairAdj[1]][pairAdj[0]] = "D";
                        }
                    })

                }
                )
            }
        }  else if(cell === "B") {

        }
        else {grid[y][x] = "D"}
        //mark adjacent cells if ship is sunk
    }

    const addShipToDatabase = (ship, id) => {
        shipsDatabase[id] = ship;
    }

    const areAllSunk = () => {
        return !Object.entries(shipsDatabase).some((pair) => pair[1].isSunk() === false);
    }

    return { getGrid, addShipToGrid, receiveAttack, addShipToDatabase, areAllSunk }
}

export default gameboard;