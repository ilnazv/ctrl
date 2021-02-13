import React, { useCallback, useEffect, useRef, useState } from "react";
import { Game } from "./Game";
import { ICanvasSize } from "./Models";
import { subscribeToList } from "./services/firestoreService";

interface GameShellProps {
    canvasSize: ICanvasSize;
}

export function GameShell({ canvasSize }: GameShellProps): JSX.Element {
    const canvasRef = useCallback((element: HTMLCanvasElement) => {
        if (!element) {
            return;
        }
        const ctx = element.getContext("2d") as CanvasRenderingContext2D;
        const game = new Game(ctx, canvasSize, 50);
        game.start(true);
        subscribeToList(data => {
            if (data.length) {
                game.handleKey(data[0].name);
            }
        });
    }, []);


    // useEffect(() => {
    //     const subscription = subscribeToList(data => {
    //         setList(data);
    //     });
    //     return subscription;
    // }, []);


    return (
        <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            style={{ border: "1px solid" }}
        />
    );
}
