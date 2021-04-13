const createPlayer = (name) => {
    const name = name;

    let turn = true;

    const getIsOnTurn = () => {
        return turn;
    }

    const toggleIsOnTurn = () => {
        turn = !turn;
    }

    return { getIsOnTurn, toggleIsOnTurn }
}

export default createPlayer;