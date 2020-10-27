import { RecoilRoot } from "recoil";
import "./App.css";
import React, { ErrorBoundary } from "react";
import { User } from "./components";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <User />
      </RecoilRoot>
    </div>
  );
}

export default App;

