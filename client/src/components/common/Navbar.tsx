import React, { useContext, useEffect, useState } from 'react'

import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { FaPowerOff } from "react-icons/fa6";
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar: React.FC = () => {
const context = useContext(AuthContext);
const { user, checkAuthState, setIsAuthenticated, isAuthenticated } = context;

const [profilePic, setProfilePic] = useState<string>("");

const navigate = useNavigate();
const toast = useToast();

const { isOpen, onOpen, onClose } = useDisclosure();

const logout = () => {
  axios
    .get("http://localhost:5001/api/auth/logout", { withCredentials: true })
    .then(async (response) => {
      await checkAuthState();
      setIsAuthenticated(false);
      setProfilePic("https://cdn-icons-png.flaticon.com/512/6596/6596121.png");
      navigate("/auth");
      toast({
        title: "Logout Successful",
        description: response.data.message,
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    })
    .catch(() => {
      toast({
        title: "Logging Out failed",
        description: "Some is wrong. Try again later!",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    });
};

const getProfilePic = async () => {
  axios
    .post(
      "https://avatarapi.com/v2/api.aspx",
      {
        username: "Arghya",
        password: "Arghya#19102003",
        email: user?.email,
      },
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    )
    .then((response) => {
      setProfilePic(response.data.Image);
      console.log(response.data.Image);
    })
    .catch((error) => {
      console.log(error.response);
      setProfilePic("https://cdn-icons-png.flaticon.com/512/6596/6596121.png");
    });
};

useEffect(() => {
  console.log(isAuthenticated); // Always call a state deciding variable inside a child component of a Page
  if (!isAuthenticated) {       // to avoid unnecessary navigations
    navigate("/auth");
  }
}, [isAuthenticated]);

useEffect(() => {
  console.log(user);
  getProfilePic();
}, [profilePic]);

  return (
    <HStack
      fontSize={30}
      fontWeight={"bold"}
      color={"#1D3FFE"}
      overflow={"hidden"}
      position={"fixed"}
      top={0}
      zIndex={10}
      w={"full"}
      justifyContent={"center"}
      background={
        "linear-gradient(90deg, rgba(233,29,166,1) 0%, rgba(32,118,196,1) 100%)"
      }
    >
      <Flex
        bgColor={"transparent"}
        w={{ base: "95%", lg: "90%" }}
        h={"fit-content"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={{ base: 3, lg: 10 }}
        py={{ base: 1, lg: 2 }}
        marginX={{ lg: 5 }}
        marginY={3}
        // borderRadius={"full"}
      >
        <HStack>
          <Box color={"white"}>Certificate Generator</Box>
        </HStack>
        <HStack
          display={{ base: "none", lg: "flex" }}
          fontSize={20}
          spacing={5}
        >
          <Box color={"white"}>
            <Link to="/">Home</Link>
          </Box>
          <Box color={"white"}>
            <Link to="requests">Requested-Certificates</Link>
          </Box>
          <Box color={"white"}>
            <Link to="approved">Approved-Certificate</Link>
          </Box>
          {user?.role === "admin" && (
            <Box color={"white"}>
              <Link to="admin">Admin-Panel</Link>
            </Box>
          )}
          <Button
            h={{ base: 10 }}
            w={{ base: 10, lg: "fit-content" }}
            colorScheme="pink"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onClick={onOpen}
            borderRadius={{ base: "full", lg: "lg" }}
          >
            <Box fontSize={20}>Profile</Box>
          </Button>
        </HStack>

        <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              borderBottomWidth="1px"
              bg={"#FEF36C"}
              alignItems={"center"}
            >
              <Box>User Info</Box>
              <DrawerCloseButton onClick={onClose} />
            </DrawerHeader>
            <DrawerBody bg={"#FDF6A2"}>
              <VStack h={"85vh"} mt={5}>
                <Avatar
                  size="xl"
                  name={user?.username || "username"}
                  src={
                    profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                  }
                />{" "}
                <Box fontWeight={500} fontSize={"2xl"}>
                  {user?.username}
                </Box>
                <Box fontWeight={500}>{user?.email}</Box>
                <Button
                  colorScheme="red"
                  px={3}
                  py={1}
                  borderRadius={"3xl"}
                  alignItems={"center"}
                  justifySelf={"flex-end"}
                  justifyContent={"center"}
                  mt={3}
                  onClick={() => logout()}
                >
                  <Center fontSize={"large"} fontWeight={500} marginRight={2}>
                    Logout
                  </Center>
                  <FaPowerOff color="white" size={20} />
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </HStack>
  );
}

export default Navbar