import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { getTodos, createTodo } from "../services/api";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const toast = useToast();

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      toast({
        title: "Error fetching todos",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTodo(newTodo);
      setNewTodo({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });
      fetchTodos();
      toast({
        title: "Todo created",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error creating todo",
        status: "error",
        duration: 2000,
      });
    }
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Heading mb={4}>Todo List</Heading>

      <Box as="form" onSubmit={handleSubmit} mb={8}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Priority</FormLabel>
            <Select
              value={newTodo.priority}
              onChange={(e) =>
                setNewTodo({ ...newTodo, priority: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="blue" width="100%">
            Add Todo
          </Button>
        </VStack>
      </Box>

      <VStack spacing={4} align="stretch">
        {todos.length === 0 ? (
          <Text>No todos yet. Create one above!</Text>
        ) : (
          todos.map((todo) => (
            <Box key={todo._id} p={4} borderWidth={1} borderRadius="md">
              <Heading size="sm">{todo.title}</Heading>
              <Text>{todo.description}</Text>
              <Text color="gray.500">Priority: {todo.priority}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
}

export default TodoList;
