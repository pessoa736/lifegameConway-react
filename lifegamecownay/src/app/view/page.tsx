"use client"
import { Box, Text } from "@chakra-ui/react";
import BackButton from "lgc/components/backButton";
import GameCanvas from "lgc/components/gameCanvas";
import ToolBar from "lgc/components/toolBar";
import { randomInt } from "lgc/utils/random";
import { useEffect, useRef, useState } from "react";

export default function Draw(){
    const [secondClicked, setSecondClicked] = useState(false);
    const [paused, setPaused] = useState(true);
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
    let list = [
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
                window.Game.ambient = window.Game.createAmbient(()=>randomInt(0,1))
                return { children: (<Text>reiniciar</Text>), click: true };
            },
            init: () => ({
                children: secondClicked ? (<Text>reiniciar</Text>) : (<Text>reiniciar</Text>),
                click: secondClicked
            })
        },
    ]

    return (
        <>
            <Box  bg="pri"  w="full" position={"absolute"} >
                <GameCanvas state={"View"}/>
                <ToolBar list={list}/>
                <BackButton href="./.." />
            </Box>
        </>
    )
}