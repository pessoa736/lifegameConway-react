import { Box, Grid, GridItem } from "@chakra-ui/react";
import Tool from "./tool";




export default function ToolBar(){

    let list = []

    return (
        <>
            <Box position="absolute" bottom="0" m="4" >
        	    <Grid>
                    {list.map(
                        (T, idx) => {
                            return (<GridItem key={idx} > <Tool /> </GridItem>)
                        }
                    )}
                </Grid>
            </Box>
        </>
    )
}


