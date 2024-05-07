import React, { useContext, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import bgImg from "../assets/bg_img.png";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

 
const AuthPage: React.FC = () => {
  const context = useContext(AuthContext);
  const { isAuthenticated, checkAuthState } = context;

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthState();
    setTimeout(() => {
      if (isAuthenticated) {
        console.log("Inside useEffect: Authpage", isAuthenticated);
        navigate("/");
      }
    }, 100);
  }, [isAuthenticated]);

  return (
    <>
      <HStack
        h={{ base: "100%", lg: "100vh" }}
        w={"100%"}
        backgroundImage={bgImg}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
        flexWrap={"wrap"}
        py={{ base: 5 }}
      >
        <Flex
          color={"white"}
          fontWeight={"bold"}
          direction={"column"}
          align={{ base: "center", lg: "start" }}
          my={{ base: 5, lg: 0 }}
        >
          <Box
            fontSize={{ base: 40, md: 50, lg: 70 }}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <Box>Saarthi</Box>
          </Box>
          <Box fontSize={{ base: 20, md: 30, lg: 40 }}>
            An OpenAI powered ChatBot
          </Box>
        </Flex>
        <Stack
          w={{ base: "90%", md: "80%", lg: "30%" }}
          mb={{ base: 20, lg: 0 }}
          mt={{ base: 5, lg: 0 }}
        >
          <Tabs
            isFitted
            variant="soft-rounded"
            bg={"white"}
            borderRadius={10}
            px={2}
            py={2}
          >
            <TabList my="1em">
              <Tab fontWeight={"bold"}>Login</Tab>
              <Tab fontWeight={"bold"}>SignUp</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Register />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </HStack>
    </>
  );
};

export default AuthPage;
