import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      toast({
        title: "Account created.",
        description: "You've been successfully registered.",
        status: "success",
        duration: 3000,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Registration failed",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box p={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default Register;
