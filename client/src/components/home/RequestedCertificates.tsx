import React from "react";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { requestedCertificate } from "../../pages/HomePage";

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
    >
      {requests.map((request: requestedCertificate) => {
        return (
          <VStack key={request.certificate._id} h={"60vh"} mx={10}>
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
            <Button colorScheme="teal" size="md" px={5} py={3} disabled={true}>
              Approval Pending
            </Button>
          </VStack>
        );
      })}
    </Flex>
  );
};

export default RequestedCertificates;
