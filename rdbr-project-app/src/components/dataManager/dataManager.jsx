import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { MyContext } from "./MyContext";
import PropTypes from "prop-types";

export const DataProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const fetchData = async () => {
    try {
      const token = "9e7cba0a-d38d-413a-be99-33f19f247653";

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
      const taskRes = await axios.get(
        "https://momentum.redberryinternship.ge/api/tasks",
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
      setTasks(taskRes.data);
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
      const token = "9e7cba0a-d38d-413a-be99-33f19f247653";

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
      const token = "9e7cba0a-d38d-413a-be99-33f19f247653";

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
      console.error(" შეცდომა დავალების დამატებისას:", error.response.data);
    }
  };
  const fetchTaskById = async (taskId) => {
    try {
      const token = "9e7cba0a-d38d-413a-be99-33f19f247653";
      const response = await axios.get(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("  შეცდომა დავალების მიღებისას:", error.response?.data);
      throw error;
    }
  };
  const updateTaskStatus = async (taskId, newStatusId) => {
    try {
      const token = "9e7cba0a-d38d-413a-be99-33f19f247653";

      await axios.put(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
        { status_id: newStatusId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("  დავალების სტატუსი წარმატებით განახლდა!");
      fetchData();
    } catch (error) {
      console.error("  შეცდომა სტატუსის განახლებისას:", error.response?.data);
    }
  };
  const addComment = async (newCommentData) => {
    try {
      const token = "9e7cba0a-d38d-413a-be99-33f19f247653";

      const formData = new FormData();
      formData.append("text", newCommentData.text);
      formData.append("task_id", newCommentData.task_id);
      const response = await axios.post(
        `https://momentum.redberryinternship.ge/api/tasks/${newCommentData.task_id}/comments`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("კომენტარი დაემატა!", response.data);
      fetchData();  
    } catch (error) {
      console.error("შეცდომა კომენტარის დამატებისას:", error.response?.data);
    }
  };
  const addReply = async (newReplyData) => {
    try {
      const token = "9e7cba0a-d38d-413a-be99-33f19f247653";

      const formData = new FormData();
      formData.append("text", newReplyData.text);
      formData.append("task_id", newReplyData.task_id);
      formData.append("parent_id", newReplyData.parent_id);  
      formData.append("author_avatar", newReplyData.author_avatar);
      formData.append("author_nickname", newReplyData.author_nickname);

      const response = await axios.post(
        `https://momentum.redberryinternship.ge/api/tasks/${newReplyData.task_id}/comments`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("რეფლაი დაემატა!", response.data);
      fetchData();  
    } catch (error) {
      console.error("შეცდომა რეფლაის დამატებისას:", error.response?.data);
    }
  };
  const fetchComments = async (taskId) => {
    try {
      const token = "9e7cba0a-d38d-413a-be99-33f19f247653";
      const response = await axios.get(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("კომენტარები წამოიღო:", response.data);
      return response.data;
    } catch (error) {
      console.error("შეცდომა კომენტარების მიღებისას:", error.response?.data);
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
      tasks,
      fetchTaskById,
      updateTaskStatus,
      addComment,
      addReply,
      fetchComments,
    };
  }, [departments, priorities, employees, statuses]);

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
