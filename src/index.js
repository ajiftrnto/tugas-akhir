import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import RequestProvider from "./context/RequestContext"; // Periksa path ini!

ReactDOM.render(
  <RequestProvider>
    <App />
  </RequestProvider>,
  document.getElementById("root")
);