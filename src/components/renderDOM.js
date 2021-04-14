const renderDOM = (() => {
    const grid = (gridInput) => {
        const gridContainer = document.createElement("div");
        gridInput.forEach(row => {
            const gridRow = document.createElement("div");
            row.forEach(field => {
                gridRow.appendChild(createOneField(field));
            })
            gridContainer.appendChild(gridRow);
        })
        gridContainer.classList.add("gridContainer");
        return gridContainer;
    }

    function createOneField(fieldContent) {
        const container = document.createElement("div");
        container.textContent = fieldContent;

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

    return { grid };
})();

export default renderDOM;