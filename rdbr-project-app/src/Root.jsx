import React from "react";
import { DataProvider } from "./components/dataManager/dataManager";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/Home/HomePage";
import AddTask from "./components/pages/AddTask/AddTask";
import { ActiveProvider } from "./components/Header/Header";
function Root() {
  return (
    <div>
      <DataProvider>
        <ActiveProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/AddTask" element={<AddTask />} />
            </Routes>
          </Router>
        </ActiveProvider>
      </DataProvider>
    </div>
  );
}

export default Root;
