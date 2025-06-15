"use client"
import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import Tool from "./tool";

interface ToolProps {
    _onclick?: (clicked?: boolean) => any,
    init: () => any
}

interface ToolBarProps {
    list: ToolProps[]
}

export default function ToolBar({ list }: ToolBarProps) {
    const size_tools = 70;
    const spacing = 11;
    const width = list.length * (size_tools + spacing);
    const height = size_tools + 10

    return (
        <Center>
            <Box
                position="fixed"
                bg="sec"
                bottom="0"
                m="4"
                w={`${width}px`}
                h={`${height}px`}
                borderRadius="2xl"
            >
                <Grid
                    m="5px"
                    templateColumns={`repeat(${list.length}, ${size_tools}px)`}
                    templateRows="1fr"
                    gapX="2"
                    justifyItems="center"
                    justifyContent="center"
                >
                    {list.map((T, idx) => (
                        <GridItem key={idx} w={`${size_tools}px`} h={`${size_tools}px`}>
                            <Tool props={T} />
                        </GridItem>
                    ))}
                </Grid>
            </Box>
        </Center>
    );
}