import React from "react";
import { Box, Button, Flex, HStack, VStack } from "@chakra-ui/react";
import { requestedCertificate } from "../../pages/HomePage";
import { Link } from "react-router-dom";

interface Props {
  approves: requestedCertificate[];
}

const ApprovedCertificates: React.FC<Props> = ({ approves }) => {
  return (
    <Flex
      minH={"90vh"}
      w={{ base: "95%", lg: "85%" }}
      py={5}
      mt={{ base: 10, lg: 20 }}
      flexWrap={"wrap"}
      justifyContent={"center"}
    >
      {approves.map((approve: requestedCertificate) => {
        return (
          <VStack key={approve.certificate._id} h={"auto"} mx={10} my={5}>
            <Box
              color={"white"}
              fontSize={25}
              fontWeight={"bold"}
              alignSelf={"center"}
            >
              {" "}
              {approve.certificate.title}{" "}
            </Box>
            <img
              src={approve.certificate.image_url}
              alt={approve.certificate.title}
              style={{ maxHeight: "40vh" }}
            />
            <HStack>
              <Button
                colorScheme="teal"
                size="md"
                px={5}
                py={3}
                disabled={true}
              >
                Approved
              </Button>
              <Button
                colorScheme="teal"
                size="md"
                px={5}
                py={3}
                disabled={true}
              >
                <Link to={approve.google_drive_url}>View Certificate</Link>
              </Button>
            </HStack>
          </VStack>
        );
      })}
    </Flex>
  );
};

export default ApprovedCertificates;
