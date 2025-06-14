import { Box, ChakraProviderProps } from "@chakra-ui/react";

interface metaTool{
    children?: React.ReactNode,
    props?: ChakraProviderProps,
    func?: () => any,
    states?: any[],
}

export default function Tool({children, props, func, states}: metaTool){

    return (
        <>
            <Box bg="pri" w="100%" aspectRatio={"1"} borderRadius="xl" p={1} onClick={func} {...props}>
                {children}
            </Box>
        </>
    )
}