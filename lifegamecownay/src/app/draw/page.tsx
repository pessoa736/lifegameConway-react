import { Box } from "@chakra-ui/react";
import GameCanvas from "lgc/components/gameCanvas";

export default function Draw(){
    return (
        <>
            <Box  bg="pri"  w="full" position={"absolute"} >
                <GameCanvas state={"draw"}/>
            </Box>
        </>
    )
}