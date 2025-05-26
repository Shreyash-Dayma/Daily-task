import { ChakraProvider, Box } from "@chakra-ui/react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <TodoList />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <ChakraProvider>
      <Box minH="100vh" p={4}>
        <RouterProvider router={router} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
