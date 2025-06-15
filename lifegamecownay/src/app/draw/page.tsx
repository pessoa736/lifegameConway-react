"use client";
import { Box, Text } from "@chakra-ui/react";
import GameCanvas from "lgc/components/gameCanvas";
import ToolBar from "lgc/components/toolBar";
import { useState, useRef, useEffect } from "react";

export default function Draw() {
    const [secondClicked, setSecondClicked] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (secondClicked) {
            timerRef.current = setTimeout(() => {
                setSecondClicked(false);
            }, 200); // 1000ms ≈ 60 frames a 60fps
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [secondClicked]);

    let list = [
        {
            _onclick: (clicked = false) => {
                let children;
                if (!clicked) {
                    children = (<Text>pause</Text>);
                } else {
                    children = (<Text>retomar</Text>);
                }
                window.Game.set_pause(!window.Game.pause);

                return { children, click: !clicked };
            },
            init: () => ({ children: (<Text>retomar</Text>), click: false })
        },
        {
            _onclick: () => {
                setSecondClicked(true);
                window.Game.limparAmbient()
                return { children: (<Text>limpar tela</Text>), click: true };
            },
            init: () => ({ children: (<Text>limpar tela</Text>), click: secondClicked })
        },
    ];

    list[1].init = () => ({
        children: secondClicked ? (<Text>limpando</Text>) : (<Text>limpar tela</Text>),
        click: secondClicked
    });

    return (
        <>
            <Box bg="pri" w="full" position={"absolute"}>
                <GameCanvas state={"draw"} />
                <ToolBar list={list} />
            </Box>
        </>
    );
}