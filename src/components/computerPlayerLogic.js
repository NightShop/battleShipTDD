const computerPlayerLogic = (() => {
    const getTarget = (gameboard) => {
        do {
            let x = Math.floor((Math.random() * 9));
            let y = Math.floor((Math.random() * 9));
            if(gameboard[y][x] !== "D") {
                return [x, y]
            }
        } while (true)
    }

    return { getTarget }
})();


export default computerPlayerLogic;