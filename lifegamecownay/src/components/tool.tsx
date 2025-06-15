import { Box, Center, Image  } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ToolProps {
    _onclick?: (clicked?: boolean) => { children: any, click: boolean },
    init: () => { children: any, click: boolean },
    icon?: string
}

interface MetaTool {
    props: ToolProps
}

export default function Tool({ props }: MetaTool) {
    const [clicked, setClicked] = useState<boolean>(false);
    const [children, setChildren] = useState<any>(null);

    useEffect(() => {
        const initResult = props.init();
        setChildren(initResult.children);
        setClicked(initResult.click);
    }, [props]);

    const OnClick = () => {
        if (props._onclick) {
            let oc = props._onclick(clicked);
            setChildren(oc.children);
            setClicked(oc.click);
        }
    };

    return (
        <Box
            bg={clicked ? "pri" : "sec"}
            color={clicked ? "sec" : "pri"}
            w="100%"
            aspectRatio="1"
            borderRadius="xl"
            borderWidth={2}
            borderColor={clicked ? "sec" : "pri"}
            p={1}
            onClick={OnClick}
        >
            {props.icon && <Image src={props.icon} alt="icon" mx="auto" mb={1} width={"100%"} imageRendering={"pixelated"}/>}
            <Center textAlign={"center"}>{children}</Center>
        </Box>
    );
}