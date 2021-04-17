const renderDOM = (() => {
    const makeGrid = (gridInput, showFields, callback = () => {}) => {
        const gridContainer = document.createElement("div");
        gridInput.forEach((column, x) => {
            const gridRow = document.createElement("div");
            column.forEach((fieldContent, y) => {
                const field = createOneField(fieldContent, callback, x, y);
                if(!showFields) {
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
        container.addEventListener("click", () => callback([y,x]));
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

    const makeShipPlacementDiv = (callback, addship) => {
        
        document.addEventListener("click", (event) => {
            const ship = callback([event.target.getAttribute("datax"),event.target.getAttribute("datay")], 2, "vertical");
            console.log(event.target.getAttribute("datax").concat(event.target.getAttribute("datay")))
            addship(ship, event.target.getAttribute("datax").concat(event.target.getAttribute("datay")));

        })


    }

    return { makeGrid, makeShipPlacementDiv };
})();

export default renderDOM;