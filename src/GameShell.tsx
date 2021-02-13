import React, { useCallback, useEffect, useRef, useState } from "react";
import { Game } from "./Game";
import { ICanvasSize } from "./Models";
import { clearList, subscribeToList } from "./services/firestoreService";

interface GameShellProps {
    canvasSize: ICanvasSize;
}

export function GameShell({ canvasSize }: GameShellProps): JSX.Element {
    const game = useRef<Game>();

    const canvasRef = useCallback((element: HTMLCanvasElement) => {
        if (!element) {
            return;
        }
        const ctx = element.getContext("2d") as CanvasRenderingContext2D;
        const newGame = new Game(ctx, canvasSize, 50);
        game.current = newGame;
        newGame.start(true);
    }, []);


    useEffect(() => {
        const subscription = subscribeToList(data => {
            if (data.length) {
                game.current?.handleKey(data[0].name);
            }
        });
        return () => {
            subscription();
            game.current?.stop();
            clearList();
        };
    }, []);


    return (
        <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            style={{ border: "1px solid" }}
        />
    );
}
