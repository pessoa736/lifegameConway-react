import { Button, Link, Text } from "@chakra-ui/react";


export default function BackButton(props){
    return (
        <>
            <Button position="fixed" bg="pri" color="sec" left={0} top={0}  w="50px" m="2%" h="50px" asChild>
                <Link borderRadius="xl" fontSize="26pt" textDecor="none" border="1px solid" href={props.href} > 
                    &lt;
                </Link>
            </Button>
        </>
    )
}