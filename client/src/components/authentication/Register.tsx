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
import { emailError, passwordError } from "../../utils/validators";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const toast = useToast();
  const navigate = useNavigate();

  const context = useContext(AuthContext);
  const { setIsAuthenticated, checkAuthState } = context;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_SERVER_API}/auth/register`,
        { username, email, password, confirmPassword },
        { withCredentials: true }
      )
      .then(async (response) => {
        console.log(response);
        toast({
          title: "Account created.",
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
          title: "Registration failed!",
          description: error.response.data.message,
          status: "error",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
      });
  };

  const submitButtonState = () => {
    if (
      !emailError(email) &&
      !passwordError(password, confirmPassword) &&
      username !== ""
    ) {
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
          <FormLabel fontWeight={"bold"}>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            border="2px"
            borderColor="blue.500"
            borderRadius={10}
          />
          {username === "" && (
            <FormHelperText color="red.500">
              Username is required
            </FormHelperText>
          )}
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

        <FormControl isRequired>
          <FormLabel fontWeight={"bold"}>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            border="2px"
            borderColor="blue.500"
            borderRadius={10}
          />
          <FormHelperText color="red.500">
            {passwordError(password, confirmPassword)}
          </FormHelperText>
        </FormControl>

        <Button
          colorScheme="linkedin"
          size="md"
          type="submit"
          isDisabled={submitButtonState()}
          mt={5}
        >
          Sign Up
        </Button>
      </VStack>
    </form>
  );
};

export default Register;
