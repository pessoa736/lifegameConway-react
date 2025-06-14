import { Box, ChakraProviderProps } from "@chakra-ui/react";

interface metaTool{
    children?: React.ReactNode,
    props?: ChakraProviderProps
}

export default function Tool({children, props}: metaTool){
    
    return (
        <>
            <Box m="4" ></Box>
        </>
    )
}