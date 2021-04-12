import createShip from "./src/components/createShip.js"

const shipOne = createShip([3,1], 3, "vertical");
shipOne.hit(3,1);
