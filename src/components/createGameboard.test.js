import createGameboard from "./createGameboard.js";
import createShip from "./createShip.js";

jest.mock("./createShip", () => {
    const ship = { 
        hit: () => {},
        isSunk: () => false,
     }
    return jest.fn(() => ship)
})



test("position ship on gameboard correctly", () => {
    const gameboard = createGameboard();
    gameboard.addShipToGrid([[3, 4], [4, 4], [5, 4], [6, 4]], "34");
    expect(gameboard.getGrid()).toEqual(
        [
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '34', '34', '34', '34', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
        ]
    )

})

test("cannot position ship that is outside of gameboard", () => {
    const gameboard = createGameboard();
    gameboard.addShipToGrid([[7, 4], [8, 4], [9, 4], [10, 4]], "34");
    expect(gameboard.getGrid()).toEqual(
        [
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
        ]
    )

})

test("hitting on already hit field of ship doesnt work", () => {
    let temp = createShip();
    
    const gameboard = createGameboard();
    gameboard.addShipToDatabase(temp, "34");
    gameboard.addShipToGrid([[3, 4], [4, 4], [5, 4], [6, 4]], "34");
    gameboard.receiveAttack([3, 4]);
    expect(gameboard.getGrid()).toEqual(
        [
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', 'B', '34', '34', '34', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
        ]
    )
})

test("hitting on already discovered field  doesnt work", () => {
    let temp = createShip();
    
    const gameboard = createGameboard();
    gameboard.addShipToDatabase(temp, "34");
    gameboard.addShipToGrid([[3, 4], [4, 4], [5, 4], [6, 4]], "34");
    gameboard.receiveAttack([3, 4]);
    gameboard.receiveAttack([3, 6]);
    gameboard.receiveAttack([3, 6]);
    expect(gameboard.getGrid()).toEqual(
        [
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', 'B', '34', '34', '34', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', 'D', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
        ]
    )
})
