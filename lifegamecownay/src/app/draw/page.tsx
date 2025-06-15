"use client";
import { Box, Text } from "@chakra-ui/react";
import GameCanvas from "lgc/components/gameCanvas";
import ToolBar from "lgc/components/toolBar";

export default function Draw(){
    let list = [
        {
            func: () => {
                window.Game.set_pause(!window.Game.pause)
            }, 
            children: (<Text>pause</Text>)},
    ]

    return (
        <>
            <Box  bg="pri"  w="full" position={"absolute"} >
                <GameCanvas state={"draw"}/>
                <ToolBar list={list}/>
            </Box>
        </>
    )
}