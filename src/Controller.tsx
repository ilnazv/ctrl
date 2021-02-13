import { useCallback } from "react";
import { addListItem, clearList } from "./services/firestoreService";

const buttonStyle = {
    padding: 10
};

export function Controller(): JSX.Element {
    const addMove = useCallback((move: 'up' | 'down' | 'right' | 'left') => {
        addListItem(new Date().getTime().toString(), move);
    }, []);

    return <>
        <button style={buttonStyle} type="button" onClick={() => addMove('up')}>Up</button>
        <button style={buttonStyle} type="button" onClick={() => addMove('down')}>Down</button>
        <button style={buttonStyle} type="button" onClick={() => addMove('left')}>Left</button>
        <button style={buttonStyle} type="button" onClick={() => addMove('right')}>Right</button>
        <button style={{
            marginTop: 50
        }} type="button" onClick={() => clearList()}>Clear</button>
    </>;
}