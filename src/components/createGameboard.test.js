import createGameboard from "./createGameboard.js";
import createShip from "./createShip.js";

jest.mock("./createShip", () => {
    const ship = { 
        hit: () => {},
        isSunk: () => false,
        getCoordinatesArray: () => [[3, 4], [4, 4], [5, 4], [6, 4]],
     }
    return jest.fn(() => ship)
})



test("position ship on gameboard correctly", () => {
    const gameboard = createGameboard();
    gameboard.addShip(createShip(), "34");
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
    const tempShip = {...createShip()};
    tempShip.getCoordinatesArray = () => [[3, 4], [4, 4], [5, 4], [6, 4], [7, 3], [8, 4], [9, 4]]
    gameboard.addShip(tempShip, "34");
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
    let tempShip = createShip();
    
    const gameboard = createGameboard();
    gameboard.addShip(tempShip, "34");
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
    gameboard.addShip(temp, "34");
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
