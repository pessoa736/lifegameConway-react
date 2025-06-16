"use client"
import { useEffect, useState } from "react";
import { Box, Button, Card, Center, ChakraProvider, Heading, Link, Text, VStack } from "@chakra-ui/react";
import GameCanvas from "lgc/components/gameCanvas";

export default function App() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize); 

    return () => {
      window.removeEventListener("resize", updateSize); 
    };
  }, []);
  console.log(screenSize)

  const buts = [
    {text: "Desenhar", href: "./draw"},
    {text: "Visualizar um cenario aleatorio", href: "./visualizacao"}
  ]

  return (
    <Box w={screenSize.width} height={screenSize.height}>
      <Box bg="pri"  position={"absolute"}>
        <GameCanvas state={"menuView"} />
      </Box>
      <Center>
        <Card.Root bg="pri" color="sec" m="10%" minW="600px" maxW="800px" w="30%">
          <Card.Header alignItems="center" justifyItems="center">
            <Heading fontWeight={900} fontSize="26pt" m="2%" >O Jogo da Vida de Cownay</Heading>
            <Text fontSize="12pt"> Feito no Next.js com Typescript e chakra.ui </Text>
          </Card.Header>
          <Card.Body mt={4} gap={4}>
            {buts.map((item, idx)=>{
              return (
                <Button key={idx} bg="sec"  p="1%" fontWeight={900} color="pri" asChild>
                  <Link href={item.href} fontSize="20pt" textDecor={"none"}>
                    {item.text}
                  </Link>
                </Button>
              )
            })}
            
          </Card.Body>
        </Card.Root>
      </Center>
    </Box>
  );
}
