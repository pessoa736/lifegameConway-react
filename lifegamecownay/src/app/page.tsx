import { Box, Button, Card, Center, ChakraProvider, Heading, Link, Text, VStack } from "@chakra-ui/react";
import GameCanvas from "lgc/components/gameCanvas";


export default function App() {
  return (
    <>
      <Box  bg="pri"  w="full" position={"absolute"} >
        <GameCanvas state={"menuView"}/>
      </Box>
      <Center h={"100vh"}>
          <Card.Root alignSelf="center" >
            <Card.Header>
              <Text fontSize="24pt">
                LifeGame Cownay in React.js
              </Text>
            </Card.Header>
            <Card.Body mt={4} gap={4}>
              <Button asChild> 
                <Link href="lifegame/view" textDecor={"none"}> Visualizar </Link> 
              </Button>
              <Button asChild> 
                <Link href="lifegame/draw" textDecor={"none"}> Desenhar </Link>  
              </Button>
            </Card.Body>
          </Card.Root>
        </Center>
    </>
  );
}

