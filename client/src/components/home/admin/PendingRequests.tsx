import React from "react";
import { requestedCertificate } from "../../../pages/HomePage";
import { Flex, VStack, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  requests: requestedCertificate[];
}

const PendingRequests: React.FC<Props> = ({ requests }) => {
  return (
    <Flex
      minH={"90vh"}
      w={{ base: "95%", lg: "85%" }}
      py={5}
      flexWrap={"wrap"}
    //   alignItems={"center"}
      justifyContent={"center"}
    >
      {requests.map((request: requestedCertificate) => {
        return (
          <Link to={`${request._id}`} key={request._id}>
            <VStack mx={10} my={5}>
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
                style={{ height: "200px" }}
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
      })}
    </Flex>
  );
};

export default PendingRequests;
