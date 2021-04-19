const gameboard = () => {
    const emptyGrid = [
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
    let grid = JSON.parse(JSON.stringify(emptyGrid));
    const getGrid = () => {
        return grid;
    }
    const shipsDatabase = {};

    const addShip = (ship, id) => {
        if (ship.getCoordinatesArray().findIndex(pair => pair[0] >= 9 || pair[1] >= 9) !== -1) {
            return
        }
        ship.getCoordinatesArray().forEach(coordinatePair => {
            grid[coordinatePair[0]][coordinatePair[1]] = id;
        });
        shipsDatabase[id] = ship;


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
        } else if (cell === "B") {

        }
        else { grid[y][x] = "D" }
        //mark adjacent cells if ship is sunk
    }

    const areAllSunk = () => {
        return !Object.entries(shipsDatabase).some((pair) => pair[1].isSunk() === false);
    }

    const resetBoard = () => {
        grid = JSON.parse(JSON.stringify(emptyGrid));
        console.log(emptyGrid);
        const keys = Object.keys(shipsDatabase);
        keys.forEach(key => {
            delete shipsDatabase[key];
        })
        console.table(grid);
        console.log("im in reset board")
    }

    return { getGrid, addShip, receiveAttack, areAllSunk, resetBoard }
}

export default gameboard;