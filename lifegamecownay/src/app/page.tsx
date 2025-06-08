import { Box, Button, Card, Center, ChakraProvider, Heading, Text, VStack } from "@chakra-ui/react";
import GameCanvas from "lgc/components/gameCanvas";



export default function App() {
  return (
    <>
      <Box  bg="pri"  w="full" position={"absolute"} >
        <GameCanvas />
      </Box>
      <Center h={"100vh"}>
          <Card.Root alignSelf="center" >
            <Card.Header>
              <Text fontSize="24pt">
                LifeGame Cownay in React.js
              </Text>
            </Card.Header>
            <Card.Body mt={4} gap={4}>
              <Button> Visualizar </Button>
              <Button> Desenhar </Button>
            </Card.Body>
          </Card.Root>
        </Center>
    </>
  );
}
