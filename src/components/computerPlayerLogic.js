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
        const isFieldFree = (x, y, hor) => {
            let isFree = true;
            const fields = [[x, y]];

            if (hor === 1) {
                for (let i = 1; i < length; i++) {
                    fields.push([x + i, y])
                }
            } else {
                for (let i = 1; i < length; i++) {
                    fields.push([x, y + i])
                }
            }
            console.table(gameboard);
            console.log("fields", fields);


            fields.forEach(field => {
                if (!(
                    ((gameboard[field[0]][field[1]]) === "") &&
                    (((gameboard[((field[0] - 1) < 0 ? field[0] : field[0] - 1)][field[1] - 1]) === undefined) || ((gameboard[((field[0] - 1) < 0 ? field[0] : field[0] - 1)][field[1] - 1]) === "")) &&
                    (((gameboard[((field[0] - 1) < 0 ? field[0] : field[0] - 1)][field[1]]) === undefined) || ((gameboard[((field[0] - 1) < 0 ? field[0] : field[0] - 1)][field[1]]) === "")) &&
                    (((gameboard[((field[0] - 1) < 0 ? field[0] : field[0] - 1)][field[1] + 1]) === undefined) || ((gameboard[((field[0] - 1) < 0 ? field[0] : field[0] - 1)][field[1] + 1]) === "")) &&
                    (((gameboard[field[0]][field[1] - 1]) === undefined) || ((gameboard[field[0]][field[1] - 1]) === "")) &&
                    (((gameboard[field[0]][field[1] + 1]) === undefined) || ((gameboard[field[0]][field[1] + 1]) === "")) &&
                    (((gameboard[((field[0] + 1) >= 9 ? field[0] : field[0] + 1)][field[1] - 1]) === undefined) || ((gameboard[((field[0] + 1) >= 9 ? field[0] : field[0] + 1)][field[1] - 1]) === "")) &&
                    (((gameboard[((field[0] + 1) >= 9 ? field[0] : field[0] + 1)][field[1]]) === undefined) || ((gameboard[((field[0] + 1) >= 9 ? field[0] : field[0] + 1)][field[1]]) === "")) &&
                    (((gameboard[((field[0] + 1) >= 9 ? field[0] : field[0] + 1)][field[1] + 1]) === undefined) || ((gameboard[((field[0] + 1) >= 9 ? field[0] : field[0] + 1)][field[1] + 1]) === ""))
                )) {
                    console.log("im in foreach")
                    isFree = false;
                }
            })
            return isFree;
        }
        do {
            let tempX = Math.floor((Math.random() * 9));
            let tempY = Math.floor((Math.random() * 9));
            let hor = Math.floor(Math.random() * 2);



            if (gameboard[tempX][tempY] === "") {
                if (hor === 1) {
                    if (tempX + length - 1 < 9) {
                        x = tempX;
                        y = tempY;
                        if (isFieldFree(tempX, tempY, hor)) {
                            return ([[x, y], length, "horizontal"]);
                        };
                    }
                }
                else {
                    if (tempY + length - 1 < 9) {
                        x = tempX;
                        y = tempY;

                        if (isFieldFree(tempX, tempY, hor)) {
                            return ([[x, y], length, "vertical"]);
                        };
                    }
                }
            }
        } while (true)




    }

    return { getTarget, getShipData }
})();


export default computerPlayerLogic;