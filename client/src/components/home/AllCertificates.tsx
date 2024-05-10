import { Box, Button, Flex, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { Certificate } from "../../pages/HomePage";


interface Props {
    certificates: Certificate[];
    }

const AllCertificates: React.FC<Props> = ({certificates}) => {
  const toast = useToast();

  const requestCertificate = async (certificateId: string) => {
    console.log(certificateId);
    axios
      .get(
        `http://localhost:5001/api/manage-certificate/user/request/${certificateId}`, {
            withCredentials: true,
        }
      )
      .then(async (response) => {
        toast({
          title: response.data.message,
          //   description: response.data.message,
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: error.response.data.message,
          //   description: error.response.data.message,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      });
  }


  return (
    <Flex
      minH={"90vh"}
      w={{ base: "95%", lg: "85%" }}
      py={5}
      mt={{ base: 10, lg: 20 }}
      flexWrap={"wrap"}
      justifyContent={"center"}
    >
      {certificates.map((certificate: Certificate) => {
        return (
          <VStack key={certificate._id} width={"30%"} mx={10} my={5}>
            <Box
              color={"white"}
              fontSize={25}
              fontWeight={"bold"}
              alignSelf={"center"}
            >
              {" "}
              {certificate.title}{" "}
            </Box>
            <img src={certificate.image_url} alt={certificate.title} />
            <Button colorScheme="teal" size="lg" px={5} py={3} onClick={() => requestCertificate(certificate._id)}>
              Request
            </Button>
          </VStack>
        );
      })}
    </Flex>
  );
};

export default AllCertificates;
