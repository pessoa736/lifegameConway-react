"use client";
import { Box, Icon, Text } from "@chakra-ui/react";
import GameCanvas from "lgc/components/gameCanvas";
import ToolBar from "lgc/components/toolBar";
import { useState, useRef, useEffect } from "react";

export default function Draw() {
    const [secondClicked, setSecondClicked] = useState(false);
    const [paused, setPaused] = useState(true);
    const [drawMode, setDrawMode] = useState<"draw" | "erase">("draw");
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (secondClicked) {
            timerRef.current = setTimeout(() => {
                setSecondClicked(false);
            }, 200);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [secondClicked]);

    
    useEffect(() => {
        if (window.Game) {
            window.Game.drawMode = drawMode;
        }
    }, [drawMode]);

    const list = [
        {
            _onclick: () => {
                setDrawMode("draw");
                return { click: true };
            },
            init: () => ({
                click: drawMode === "draw"
            }),
            icon: "./sprites/lapiz.png"
        },
        {
            _onclick: () => {
                setDrawMode("erase");
                return { click: true };
            },
            init: () => ({
                click: drawMode === "erase"
            }),
            icon: "./sprites/borracha.png"
        },
        {
            _onclick: () => {
                setPaused(true);
                window.Game.set_pause(true);
                return { children: <Text>pause</Text>, click: true };
            },
            init: () => ({
                children: <Text>pause</Text>,
                click: paused // ativo só se pausado
            })
        },
        {
            _onclick: () => {
                setPaused(false);
                window.Game.set_pause(false);
                return { children: <Text>run</Text>, click: true };
            },
            init: () => ({
                children: <Text>run</Text>,
                click: !paused // ativo só se rodando
            })
        },
        {
            _onclick: () => {
                setSecondClicked(true);
                window.Game.limparAmbient();
                return { children: (<Text>limpar tela</Text>), click: true };
            },
            init: () => ({
                children: secondClicked ? (<Text>limpando</Text>) : (<Text>limpar tela</Text>),
                click: secondClicked
            })
        },
    ];

    return (
        <>
            <Box bg="pri" w="full" position={"absolute"}>
                <GameCanvas state={"draw"} />
                <ToolBar list={list} />
            </Box>
        </>
    );
}