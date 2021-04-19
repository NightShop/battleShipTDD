const renderDOM = (() => {
    const makeGrid = (gridInput, showFields, callback = () => { }) => {
        const gridContainer = document.createElement("div");
        gridInput.forEach((column, x) => {
            const gridRow = document.createElement("div");
            column.forEach((fieldContent, y) => {
                const field = createOneField(fieldContent, callback, x, y);
                if (!showFields) {
                    field.classList.add("enemyField");
                }
                gridRow.appendChild(field);
            })
            gridContainer.appendChild(gridRow);
        })
        gridContainer.classList.add("gridContainer");
        return gridContainer;
    }

    function createOneField(fieldContent, callback, x, y) {
        const container = document.createElement("div");
        container.textContent = fieldContent;
        container.setAttribute("dataX", x);
        container.setAttribute("dataY", y);
        container.addEventListener("click", () => callback([y, x]));
        switch (fieldContent) {
            case "B":
                container.classList.add("bombed");
                break;
            case "D":
                container.classList.add("revealed")
                break;
            case "":
                container.classList.add("unrevealed");
                break;
            default:
                container.classList.add("ship");

        }


        container.classList.add("gridField");

        return container;
    }

    const makeShipPlacementDiv = async (callback, addshipp, gridcontainer) => {
        const playerShipLengths = [5, 3, 2];

        const shipPlacementDiv = document.createElement("div");
        const rotateButton = document.createElement("button");
        rotateButton.textContent = "Rotate Ship";
        let shipLength = document.createElement("h5");
        let shipOrientation = document.createElement("h5");
        shipPlacementDiv.appendChild(shipLength);
        shipPlacementDiv.appendChild(shipOrientation);
        let counter = 0;


        let orientation = "horizontal";

        shipLength.textContent = playerShipLengths[0];
        shipOrientation.textContent = orientation;

        rotateButton.addEventListener("click", () => {
            if (orientation === "horizontal") {
                orientation = "vertical";
                shipOrientation.textContent = orientation;
            }
            else if (orientation === "vertical") {
                orientation = "horizontal";
                shipOrientation.textContent = orientation;
            }
        })


        

        gridcontainer.addEventListener("click", function makeships(event) {
            if (counter < playerShipLengths.length) {
                const id = [event.target.getAttribute("datax") + event.target.getAttribute("datay")];
                const ship = callback([event.target.getAttribute("datax"), event.target.getAttribute("datay")], playerShipLengths[counter], orientation);
                addshipp(ship, id);
                counter += 1;
                shipLength.textContent = playerShipLengths[counter];
            }
            if (counter === playerShipLengths.length) {
                gridcontainer.removeEventListener("click", makeships);
                shipPlacementDiv.innerHTML = "";
                console.log("in makeship placement");
            }
            
            
            
        })
        
        
        shipPlacementDiv.appendChild(rotateButton);
        
        return shipPlacementDiv;
        


    }

    return { makeGrid, makeShipPlacementDiv };
})();

export default renderDOM;