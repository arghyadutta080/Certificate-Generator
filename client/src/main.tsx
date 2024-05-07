import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthState from "./context/AuthState.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthState>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthState>
  </React.StrictMode>
);
