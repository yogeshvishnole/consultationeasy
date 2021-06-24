import React, { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";

import history from "./helpers/history";
import Routes from "./routes";

import "./fontawesome";
import { RootState } from "./app";
import { useSelector } from "react-redux";

function App() {
  const { token } = useSelector((state: RootState) => state.user);
  useEffect(() => {}, []);
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

export default App;
