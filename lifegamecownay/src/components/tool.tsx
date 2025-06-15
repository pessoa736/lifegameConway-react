import { Box, Center, Image as IMG } from "@chakra-ui/react";
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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const initResult = props.init();
        setChildren(initResult.children);
        setClicked(initResult.click);
    }, [props]);

    useEffect(() => {
        setIsLoading(true);
        const img = new Image(64, 64);
        img.src = props.icon || "";
        img.onload = () => setIsLoading(false);
        img.onerror = () => setIsLoading(false); // Tratar erro, se necessário
    }, [props.icon]);

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
            {isLoading ? (
                <Center>Carregando...</Center>
            ) : (
                props.icon && <IMG src={props.icon} alt="icon" mx="auto" mb={1} width={"100%"} imageRendering={"pixelated"} />
            )}
            <Center textAlign={"center"}>{children}</Center>
        </Box>
    );
}