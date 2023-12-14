import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { StoriesProvider } from "./Context/StoriesContext.jsx";

import "./styles/styles.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <StoriesProvider>
        <App />
      </StoriesProvider>
    </AuthProvider>
  </React.StrictMode>
);
