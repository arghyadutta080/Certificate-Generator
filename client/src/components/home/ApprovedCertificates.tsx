import React from "react";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { requestedCertificate } from "../../pages/HomePage";
import { Link } from "react-router-dom";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

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
      alignItems={!approves || approves?.length === 0 ? "center" : ""}
    >
      {!approves ? (
        <Text color={"white"} fontSize={100}>
          Loading...
        </Text>
      ) : approves?.length === 0 ? (
        <Text color={"white"} fontSize={100} textAlign={"center"}>
          No Approved Certificate is available!
        </Text>
      ) : (
        approves.map((approve: requestedCertificate) => {
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
              {approve.google_drive_url !== "" ? (
                <iframe
                  src={approve.google_drive_url}
                  style={{ width: "auto", height: "233px" }}
                ></iframe>
              ) : (
                <img
                  src={approve.certificate.image_url}
                  alt={approve.certificate.title}
                  style={{ height: "300px" }}
                />
              )}
              <HStack>
                <Button
                  colorScheme="teal"
                  size="md"
                  px={5}
                  py={3}
                  disabled={true}
                >
                  <IoCheckmarkDoneSharp size={20} />
                  <Text ml={2}>Approved</Text>
                </Button>
                <Link to={approve.google_drive_url}>
                  <Button
                    colorScheme="teal"
                    size="md"
                    px={5}
                    py={3}
                    disabled={true}
                    flex={"row"}
                    alignItems={"center"}
                  >
                    <FaEye size={25}/>
                    <Text ml={2}>View Certificate</Text>
                  </Button>
                </Link>
              </HStack>
            </VStack>
          );
        })
      )}
    </Flex>
  );
};

export default ApprovedCertificates;
