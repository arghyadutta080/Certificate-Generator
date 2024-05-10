import React from 'react'
import { requestedCertificate } from '../../../pages/HomePage'
import { Flex, VStack, Box, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';


interface Props {
    approvals: requestedCertificate[];
}

const ApprovedRequests: React.FC<Props> = ({approvals}) => {
  return (
    <Flex
      minH={"90vh"}
      w={{ base: "95%", lg: "85%" }}
      py={5}
      flexWrap={"wrap"}
      justifyContent={"center"}
    >
      {approvals.map((approval: requestedCertificate) => {
        return (
          <VStack key={approval._id} mx={10} my={5}>
            <Box
              color={"white"}
              fontSize={25}
              fontWeight={"bold"}
              alignSelf={"center"}
            >
              Approved to: {approval.username}
            </Box>
            {approval.google_drive_url !== "" ? (
              <iframe
                src={approval.google_drive_url}
                style={{ width: "auto", height: "233px" }}
              ></iframe>
            ) : (
              <img
                src={approval.certificate.image_url}
                alt={approval.certificate.title}
                style={{ height: "300px" }}
              />
            )}
            <Link to={approval.google_drive_url}>
              <Button
                colorScheme="teal"
                size="md"
                px={5}
                py={3}
                disabled={true}
              >
                View Certificate
              </Button>
            </Link>
          </VStack>
        );
      })}
    </Flex>
  );
}

export default ApprovedRequests