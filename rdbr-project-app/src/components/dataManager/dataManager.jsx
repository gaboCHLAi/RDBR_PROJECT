import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { MyContext } from "./MyContext";
import PropTypes from "prop-types";

export const DataProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const fetchData = async () => {
    try {
      const token = "9e71ea83-3bb1-477c-92ab-531f29e21cbf";

      const departmentsRes = await axios.get(
        "https://momentum.redberryinternship.ge/api/departments"
      );
      const prioritiesRes = await axios.get(
        "https://momentum.redberryinternship.ge/api/priorities"
      );

      const employeesRes = await axios.get(
        "https://momentum.redberryinternship.ge/api/employees",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const statusesRes = await axios.get(
        "https://momentum.redberryinternship.ge/api/statuses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDepartments(departmentsRes.data);
      setPriorities(prioritiesRes.data);
      setEmployees(employeesRes.data);
      setStatuses(statusesRes.data);
      console.log(statuses);
    } catch (error) {
      console.error("შეცდომა მონაცემების წამოღებისას:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(priorities);
  }, [priorities]);

  const addEmployee = async (newEmployeeData) => {
    try {
      const token = "9e71ea83-3bb1-477c-92ab-531f29e21cbf";

      const formData = new FormData();
      formData.append("name", newEmployeeData.name);
      formData.append("surname", newEmployeeData.surname);
      formData.append("avatar", newEmployeeData.avatar);
      formData.append("department_id", newEmployeeData.department_id);

      const response = await axios.post(
        "https://momentum.redberryinternship.ge/api/employees",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log(" ახალი თანამშრომელი დაემატა!", response.data);
      fetchData();
    } catch (error) {
      console.error(" შეცდომა თანამშრომლის დამატებისას:", error);
    }
  };

  const addTask = async (newTaskData) => {
    try {
      const token = "9e71ea83-3bb1-477c-92ab-531f29e21cbf";

      const TaskData = new FormData();
      TaskData.append("name", newTaskData.name);
      TaskData.append("description", newTaskData.description);
      TaskData.append("due_date", newTaskData.due_date);
      TaskData.append("status_id", newTaskData.status);
      TaskData.append("priority_id", newTaskData.priority);
      TaskData.append("employee_id", newTaskData.employee);
      TaskData.append("department_id", newTaskData.department_id);  

      const response = await axios.post(
        "https://momentum.redberryinternship.ge/api/tasks",
        TaskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("  ახალი დავალება დაემატა!", response.data);
      fetchData();
    } catch (error) {
      console.error("❌ შეცდომა დავალების დამატებისას:", error.response.data);
    }
  };
  const contextValue = useMemo(() => {
    return {
      departments,
      priorities,
      employees,
      statuses,
      addEmployee,
      addTask,
    };
  }, [departments, priorities, employees, statuses]);

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
