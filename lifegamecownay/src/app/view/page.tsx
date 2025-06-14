import { Box } from "@chakra-ui/react";
import GameCanvas from "lgc/components/gameCanvas";
import ToolBar from "lgc/components/toolBar";

export default function Draw(){
    return (
        <>
            <Box  bg="pri"  w="full" position={"absolute"} >
                <GameCanvas state={"View"}/>
            </Box>
        </>
    )
}