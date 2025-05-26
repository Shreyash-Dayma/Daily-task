import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send plain text password, not hashed
      const response = await login(email, password);
      localStorage.setItem("token", response.token);
      toast({
        title: "Login successful",
        status: "success",
        duration: 2000,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={8} maxWidth="500px" margin="0 auto">
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
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            isLoading={loading}
          >
            Login
          </Button>
          <Text>
            Don't have an account? <Link to="/register">Register</Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}

export default Login;
