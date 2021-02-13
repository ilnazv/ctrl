import React from "react";
import { GameShell } from "./GameShell";

export function GamePage(): JSX.Element {
    const blockSize = 8;
    const canvasWidth = 500;
    const canvasHeight = 500;

    return <div>
        <GameShell canvasSize={{ width: canvasWidth, height: canvasHeight, blockSize }}></GameShell>
    </div>;
}