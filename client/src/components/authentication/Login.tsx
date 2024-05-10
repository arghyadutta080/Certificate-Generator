import React, { useContext, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { emailError } from "../../utils/validators";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const toast = useToast();
  const navigate = useNavigate();

  const context = useContext(AuthContext);
  const { setIsAuthenticated, checkAuthState } = context;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_SERVER_API}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      .then(async (response) => {
        toast({
          title: "Authentication Successful",
          description: response.data.message,
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
        await checkAuthState(); // Always run a chechAuth() function after successfully Logged In
        setIsAuthenticated(true);
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: "Login failed!",
          description: error.response.data.message,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const submitButtonState = () => {
    if (!emailError(email) && password !== "") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <VStack spacing={5}>
        <FormControl isRequired>
          <FormLabel fontWeight={"bold"}>Email</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            border="2px"
            borderColor="blue.500"
            borderRadius={10}
          />
          <FormHelperText color="red.500">{emailError(email)}</FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight={"bold"}>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            border="2px"
            borderColor="blue.500"
            borderRadius={10}
          />
          {password === "" && (
            <FormHelperText color="red.500">
              This field is required!
            </FormHelperText>
          )}
        </FormControl>

        <Button
          colorScheme="linkedin"
          size="md"
          type="submit"
          isDisabled={submitButtonState()}
          mt={5}
        >
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
