import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import { requestedCertificate } from "../../pages/HomePage";
import { FaRegClock } from "react-icons/fa6";

interface Props {
  requests: requestedCertificate[];
}

const RequestedCertificates: React.FC<Props> = ({ requests }) => {
  return (
    <Flex
      minH={"90vh"}
      w={{ base: "95%", lg: "85%" }}
      py={5}
      mt={{ base: 10, lg: 20 }}
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignItems={!requests || requests?.length === 0 ? "center" : ""}
    >
      {!requests ? (
        <Text color={"white"} fontSize={100}>
          Loading...
        </Text>
      ) : requests?.length === 0 ? (
        <Text color={"white"} fontSize={100} textAlign={"center"}>
          No Certificate is requested yet!
        </Text>
      ) : (
        requests.map((request: requestedCertificate) => {
          return (
            <VStack key={request.certificate._id} w={"30%"} mx={10} my={5}>
              <Box
                color={"white"}
                fontSize={25}
                fontWeight={"bold"}
                alignSelf={"center"}
              >
                {" "}
                {request.certificate.title}{" "}
              </Box>
              <img
                src={request.certificate.image_url}
                alt={request.certificate.title}
              />
              <Button
                colorScheme="teal"
                size="md"
                px={5}
                py={3}
                disabled={true}
                alignItems={"center"}
              >
                <FaRegClock size={20}/>
                <Text ml={2}>Request Pending</Text>
              </Button>
            </VStack>
          );
        })
      )}
    </Flex>
  );
};

export default RequestedCertificates;
