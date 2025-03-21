import React from "react";
import { DataProvider } from "./components/dataManager/dataManager";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/Home/HomePage";
import AddTask from "./components/pages/AddTask/AddTask";
import { ActiveProvider } from "./components/Header/Header";
import TaskInfo from "./components/pages/TaskInfo/TaskInfo";
function Root() {
  return (
    <div>
      <DataProvider>
        <ActiveProvider>
          <Router basename="/RDBR_PROJECT">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/AddTask" element={<AddTask />} />
              <Route path="/task/:taskId" element={<TaskInfo />} /> 
            </Routes>
          </Router>
        </ActiveProvider>
      </DataProvider>
    </div>
  );
}

export default Root;
