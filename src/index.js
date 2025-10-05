import React from "react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import awsConfig from "./aws-exports";
import App from "./App";

Amplify.configure(awsConfig);

createRoot(document.getElementById("root")).render(<App />);
