import React from "react";
import Header from "../../Header/Header";
import "./TaskInfo.scss";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../dataManager/MyContext";
import { Dropdown, DropdownItem, DropdownToggle } from "react-bootstrap";
import Comments from "../../Comments/Comments";
function TaskInfo() {
  const { taskId } = useParams();
  const { statuses, updateTaskStatus } = useContext(MyContext);
  const { fetchTaskById } = useContext(MyContext);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState();

  const handleColorPryo = (priority) => {
    switch (priority) {
      case 1:
        return "#08A508";
      case 2:
        return "#FFBE0B";
      case 3:
        return "#FF006E";
    }
  };
  const handleColorDep = (depId) => {
    switch (depId) {
      case 1:
        return "#F7BC30";
      case 2:
        return "#FB5607";
      case 3:
        return "#FF006E";
      case 4:
        return "#3A86FF";
      case 5:
        return "#3A86FF";
      case 6:
        return "#3A86FF";
      case 7:
        return "#3A86FF";
    }
  };
  const shortenedName = (depId) => {
    switch (depId) {
      case 1:
        return "ადმინიტრაცია";
      case 2:
        return "რესურსები";
      case 3:
        return "ფინანსები";
      case 4:
        return "მარკეტინგი";
      case 5:
        return "ლოჯისტიკა";
      case 6:
        return "ტექნოლოგა";
      case 7:
        return "მედია";
    }
  };
  const handleStatusChange = async (newStatusId) => {
    const selectedOption = statuses.find((status) => status.id === newStatusId);
    if (selectedOption) {
      setSelectedStatus(selectedOption.name);
      await updateTaskStatus(task.id, newStatusId);
    }
  };
  useEffect(() => {
    const getTask = async () => {
      try {
        const data = await fetchTaskById(taskId);
        setTask(data);
        if (data && data.status) {
          setSelectedStatus(data.status.name);
        }
      } catch (error) {
        setError("დავალება ვერ მოიძებნა!");
      } finally {
        setLoading(false);
      }
    };

    getTask();
  }, [taskId, fetchTaskById]);

  if (loading) return <p>იტვირთება...</p>;
  if (error) return <p>შეცდომა: {error}</p>;
  if (!task) return <p>Task is unavailable</p>;

  return (
    <div className="Main-container">
      <Header />
      <div className="d-flex  justify-content-between ">
        <div className="TaskInfo">
          <div className="pryDep d-flex column-gap-2">
            <div
              className="priority"
              style={{
                borderColor: handleColorPryo(task.priority.id),
                color: handleColorPryo(task.priority.id),
              }}
            >
              <img src={task.priority.icon} alt="icon" />
              {task.priority.name}
            </div>
            <div
              className="shortenedName"
              style={{
                backgroundColor: handleColorDep(task.department.id),
              }}
            >
              {shortenedName(task.department.id)}
            </div>
          </div>
          <h2>{task.name}</h2>
          <p>{task.description}</p>
          <h3>დავალების დეტალები</h3>
          <div className="taskDetails">
            <div className="leftSide">
              <div className="d-flex column-gap-1 ">
                <img src=" /RDBR_PROJECT/assets/icons/pie-chart.svg" alt="#" />
                <div>სტატუსი</div>
              </div>
              <div className="d-flex column-gap-1">
                <img src=" /RDBR_PROJECT/assets/icons/user.svg" alt="usersvg" />
                <div>თანამშრომელი</div>
              </div>
              <div className="d-flex column-gap-1">
                <img src=" /RDBR_PROJECT/assets/icons/calendar.png" alt="#" />
                <div> დავალების ვადა</div>
              </div>
            </div>
            <div className="rightSide">
              <Dropdown>
                <Dropdown.Toggle className="custom-toggle">
                  {selectedStatus || "აირჩიე სტატუსი"}{" "}
                  <img src=" /RDBR_PROJECT/assets/icons/Icon.svg" alt="icon" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {" "}
                  {statuses.map((option) => (
                    <Dropdown.Item
                      key={option.id}
                      onClick={() => handleStatusChange(option.id)}
                    >
                      {option.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <div className="employee">
                <img
                  src={task.employee.avatar}
                  alt="თანამშრომელი"
                  className="employeeAvatar"
                />
                <div>
                  <h6> {task.department.name}</h6>
                  <div>
                    {" "}
                    <span>
                      {task.employee.name} {task.employee.surname}
                    </span>
                  </div>
                </div>
              </div>
              <div>{task.due_date.slice(0, 10)}</div>
            </div>
          </div>
        </div>
        <div className="commentsSide">
          <Comments taskId={task.id} />
        </div>
      </div>
    </div>
  );
}

export default TaskInfo;
