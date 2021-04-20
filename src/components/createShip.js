const createShip = (origin, length, orientation) => {
    let coordinates = [pointFactory(...origin)];
    let sunk = false;

    if (orientation == "horizontal") {
        for (let i = 1; i < length; i++) {
            coordinates.push(pointFactory(parseInt(origin[0], 10) + i, parseInt(origin[1], 10)));
        }
    } else if (orientation == "vertical") {
        for (let i = 1; i < length; i++) {
            coordinates.push(pointFactory(parseInt(origin[0], 10), parseInt(origin[1]) + i));
        }
    } else {
        throw new Error("orientation not correct");
    };

    const id = origin.join("").toString();

    const hit = (col, row) => {
        const newCoordinates = coordinates.map(item => {
            if (item.x === col && item.y === row) {
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

    const getCoordinatesArray = () => {
        return coordinates.map(coordinate => {
            return [coordinate.x, coordinate.y];
        })
    }

    const getId = () => {
        return id;
    }

    const isSunk = () => {
        return sunk;
    }

    return {
        isSunk,
        getCoordinates,
        length,
        hit,
        getId,
        getCoordinatesArray,
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