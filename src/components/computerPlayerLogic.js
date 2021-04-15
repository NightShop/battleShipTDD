const computerPlayerLogic = (() => {
    const getTarget = (gameboard) => {
        do {
            let x = Math.floor((Math.random() * 9));
            let y = Math.floor((Math.random() * 9));
            if (gameboard[y][x] !== "D") {
                return [x, y]
            }
        } while (true)
    }

    const getShipData = (gameboard, length) => {
        let x;
        let y;
        do {
            let tempX = Math.floor((Math.random() * 9));
            let tempY = Math.floor((Math.random() * 9));
            let hor = Math.floor(Math.random() * 2);
            


            if (gameboard[tempY][tempX] === "") {
                if (hor === 1) {
                    console.log(tempX);
                    console.log(tempY);
                    if (tempX + length - 1 < 9) {
                        x = tempX;
                        y = tempY;
                        return ([[x, y], length, "horizontal"]);
                    }
                }
                else {
                    if (tempY + length - 1 < 9) {
                        x = tempX;
                        y = tempY;
                        return ([[x, y], length, "vertical"]);
                    }
                }
            }
        } while (true)



    }

    return { getTarget, getShipData }
})();


export default computerPlayerLogic;