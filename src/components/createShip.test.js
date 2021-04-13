import { pointFactory } from "./createShip"
import createShip from "./createShip"

test("corect point create", () => {
    expect(pointFactory(1, 3)).toEqual({
        x: 1,
        y: 3,
        hit: false,
    })
})

test("work with both orientations", () => {
    expect(createShip([0, 0], 3, "vertical").getCoordinates()).toEqual(
        [
            pointFactory(0, 0),
            pointFactory(0,1),
            pointFactory(0, 2),
        ]
    ),
    expect(createShip([0, 0], 3, "horizontal").getCoordinates()).toEqual(
        [
            pointFactory(0, 0),
            pointFactory(1,0),
            pointFactory(2, 0),
        ]
    )
})

test("hitting coordinate works", () => {
    const ship = createShip([0,0], 3, "horizontal");
    ship.hit(1,0);
    expect(ship.getCoordinates()[1]).toMatchObject({x:1, y:0, hit:true});
    
})

test("ship isSunk is working", () => {
    const ship = createShip([1,1], 3, "vertical");
    for(let i = 0; i < ship.length; i++) {
        ship.hit(1, 1 + i);
    }
    expect(ship.isSunk()).toBe(true);
})