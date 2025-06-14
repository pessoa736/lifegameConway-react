"use client"
import { Box, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import Tool from "./tool";




export default function ToolBar({list}){
    let size_tools = 60
 
    return (
        <>
            <Center>
                <Box 
                    position="fixed" 
                    bg="sec" 
                    bottom="0" 
                    m="4" 
                    w={list.length*(size_tools+11)} 
                    h="75px" 
                    borderRadius="2xl"
                    >
                    <Grid 
                        m="5px" 
                        templateColumns={`repeat(auto-fit, ${size_tools}px)`} 
                        templateRows="1fr"  
                        gapX="2" 
                        justifyItems="center"
                        justifyContent="center"
                        >
                            {list.map(
                                (T, idx) => {
                                    return (
                                        <GridItem key={idx} w={`${size_tools}px`} h={`${size_tools}px`} > 
                                            <Tool func={T?.func}>{T?.children}</Tool>
                                        </GridItem>
                                    )
                                }
                            )}
                    </Grid>
                </Box>
            </Center>
        </>
    )
}


