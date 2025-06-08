import { Box, Center, ChakraProvider, Heading, VStack } from "@chakra-ui/react";
import GameCanvas from "lgc/components/gameCanvas";



export default function App() {
  return (
    <>
      <Box  bg="pri"  w="full"  >
        <GameCanvas />
      </Box>
    </>
  );
}
