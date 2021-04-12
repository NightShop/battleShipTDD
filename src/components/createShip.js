const createShip = (origin, length, orientation) => {
    let coordinates = [pointFactory(...origin)];
    let sunk = false;
    if (orientation == "vertical") {
        for (let i = 1; i < length; i++) {
            coordinates.push(pointFactory(origin[0], origin[1] - i));
        }
    } else if (orientation == "horizontal") {
        for (let i = 1; i < length; i++) {
            coordinates.push(pointFactory(origin[0] + i, origin[1]));
        }
    } else {
        throw (err)
    };

    const hit = (x, y) => {
        const newCoordinates = coordinates.map(item => {
            if (item.x === x && item.y === y) {
                let tempItem = { ...item };
                tempItem.hit = true;
                return tempItem;
            }
            return item;
        })
        coordinates = newCoordinates;
        if (coordinates.findIndex(item => {
            return item.hit === false
        }) === -1) {
            sunk = true;
        }
    }

    const getCoordinates = () => {
        return coordinates;
    }

    const isSunk = () => {
        return sunk;
    }

    return {
        isSunk,
        getCoordinates,
        length,
        hit,
    }
}

function pointFactory(x, y) {
    return {
        x: x,
        y: y,
        hit: false
    }
}

export { pointFactory };
export default createShip;