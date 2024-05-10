import React from "react";
import { requestedCertificate } from "../../../../pages/HomePage";
import { Flex, VStack, Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  requests: requestedCertificate[];
}

const PendingRequests: React.FC<Props> = ({ requests }) => {
  return (
    <Flex
      minH={"70vh"}
      w={{ base: "95%", lg: "95%" }}
      py={5}
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
          No pending request for Certificate!
        </Text>
      ) : (
        requests.map((request: requestedCertificate) => {
          return (
            <Link to={`${request._id}`} key={request._id}>
              <VStack mx={10} my={5}>
                <Box
                  color={"white"}
                  fontSize={25}
                  fontWeight={"bold"}
                  alignSelf={"center"}
                >
                  Requested by: {request.username}
                </Box>
                <img
                  src={request.certificate.image_url}
                  alt={request.certificate.title}
                  style={{ height: "300px" }}
                />
                <Button
                  colorScheme="teal"
                  size="md"
                  px={5}
                  py={3}
                  disabled={true}
                >
                  View Request
                </Button>
              </VStack>
            </Link>
          );
        })
      )}
    </Flex>
  );
};

export default PendingRequests;
