import { useToast } from "@chakra-ui/react";

export const makeToast = (toast: any, title: string, desc: string, status: any) => {
    return toast({
        title: title,
        description: desc,
        status: status,
        duration: 2000,
        isClosable: true,
    });
}

