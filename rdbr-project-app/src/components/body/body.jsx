import React, { useContext, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./Body.scss";
import { MyContext } from "../../components/dataManager/MyContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import TaskInfo from "../pages/TaskInfo/TaskInfo";

const DropDown = ({ name, options, setConfirmedOptions, confirmedOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState(confirmedOptions);

  const handleCheckboxChange = (optionId) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(optionId)
        ? prevSelected.filter((id) => id !== optionId)
        : [...prevSelected, optionId]
    );
  };
  
  useEffect(() => {
    setSelectedOptions(confirmedOptions);
  }, [confirmedOptions]);

  const handleConfirmSelection = () => {
    setConfirmedOptions(selectedOptions);
  };

  return (
    <div className="d-flex flex-column">
      <Dropdown className="custom-dropdown">
        <Dropdown.Toggle>
          {name} <img src="/assets/icons/Icon.svg" alt="Arrow" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((option) => (
            <Dropdown.Item
              key={option.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCheckboxChange(option.id);
              }}
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="checkBox"
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => {}}
                />
                {option.name} {option.surname}
              </div>
            </Dropdown.Item>
          ))}
          <button
            type="button"
            className="choose"
            onClick={() => {
              handleConfirmSelection();
              document.body.click();
            }}
          >
            არჩევა
          </button>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const StatusBar = ({ tasks }) => {
  const navigate = useNavigate();
  const { statuses } = useContext(MyContext);
  useEffect(() => {
    console.log(statuses);
  }, [statuses]);

  const handleColorPro = (status) => {
    switch (status) {
      case 1:
        return "#F7BC30";
      case 2:
        return "#FB5607";
      case 3:
        return "#FF006E";
      case 4:
        return "#3A86FF";
    }
  };
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
  return (
    <div className="statusBar">
      {statuses.map((status) => (
        <div key={status.id}>
          <div
            className="statusName"
            style={{ backgroundColor: handleColorPro(status.id) }}
          >
            {status.name}
            {console.log(status.name)}
          </div>
          {tasks
            .filter((task) => task.status.id === status.id)
            .map((task) => (
              <div key={task.id} className="task">
                <button
                  className="Cards"
                  style={{ borderColor: handleColorPro(status.id) }}
                  onClick={() => navigate(`/task/${task.id}`)}
                >
                  <div className="d-flex justify-content-between">
                    <div className="d-flex gap-1">
                      <div
                        className="priority"
                        style={{
                          borderColor: handleColorPryo(task.priority.id),
                          color: handleColorPryo(task.priority.id),
                        }}
                      >
                        <img
                          src={task.priority.icon}
                          alt="icon"
                          className="icon"
                        />
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
                    <div className="data">{task.due_date.slice(0, 10)}</div>
                  </div>
                  <div className="d-flex flex-column align-items-lg-start">
                    <div className="texts">
                      <div className="Title">{task.name}</div>
                      <div className="Description">{task.description}</div>
                    </div>
                    <div className="avatarWrap">
                      <img
                        src={task.employee.avatar}
                        alt="avatar"
                        className="avatar"
                      />
                    </div>
                  </div>
                </button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

function Body() {
  const { departments, priorities, employees, tasks } = useContext(MyContext);

  const [confirmedDepartments, setConfirmedDepartments] = useState([]);
  const [confirmedPriorities, setConfirmedPriorities] = useState([]);
  const [confirmedEmployees, setConfirmedEmployees] = useState([]);

  const removeFilter = (filterType, id) => {
    switch (filterType) {
      case "department":
        setConfirmedDepartments((prev) => prev.filter((depId) => depId !== id));
        break;
      case "priority":
        setConfirmedPriorities((prev) =>
          prev.filter((prioId) => prioId !== id)
        );
        break;
      case "employee":
        setConfirmedEmployees((prev) => prev.filter((empId) => empId !== id));
        break;
      case "clear":
        setConfirmedEmployees([]);
        setConfirmedPriorities([]);
        setConfirmedDepartments([]);
        break;
      default:
        break;
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesDepartment =
      confirmedDepartments.length === 0 ||
      confirmedDepartments.includes(task.department.id);

    const matchesPriority =
      confirmedPriorities.length === 0 ||
      confirmedPriorities.includes(task.priority.id);

    const matchesEmployee =
      confirmedEmployees.length === 0 ||
      confirmedEmployees.includes(task.employee.id);

    return matchesDepartment && matchesPriority && matchesEmployee;
  });

  return (
    <main className="body">
      <p className="addTask">დავალების გვერდი</p>

      <div className="wrapDropDowns">
        <DropDown
          name="დეპარტამენტი"
          options={departments}
          confirmedOptions={confirmedDepartments}
          setConfirmedOptions={setConfirmedDepartments}
        />
        <DropDown
          name="პრიორიტეტი"
          options={priorities}
          confirmedOptions={confirmedPriorities}
          setConfirmedOptions={setConfirmedPriorities}
        />
        <DropDown
          name="თანამშრომელი"
          options={employees}
          confirmedOptions={confirmedEmployees}
          setConfirmedOptions={setConfirmedEmployees}
        />
      </div>

      <div className="selected-options-container">
        {confirmedDepartments.length > 0 && (
          <div className="selected-options d-flex gap-2">
            {confirmedDepartments.map((id) => {
              const option = departments.find((opt) => opt.id === id);
              return option ? (
                <div className="d-flex" key={id}>
                  <button
                    className="selected-item"
                    onClick={() => removeFilter("department", id)}
                  >
                    {option.name}
                    <img src="/assets/icons/x (1).svg" alt="remove" />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        )}

        {confirmedPriorities.length > 0 && (
          <div className="selected-options d-flex gap-2">
            {confirmedPriorities.map((id) => {
              const option = priorities.find((opt) => opt.id === id);
              return option ? (
                <div className="d-flex" key={id}>
                  <button
                    className="selected-item"
                    onClick={() => removeFilter("priority", id)}
                  >
                    {option.name}
                    <img src="/assets/icons/x (1).svg" alt="remove" />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        )}

        {confirmedEmployees.length > 0 && (
          <div className="selected-options d-flex gap-2">
            {confirmedEmployees.map((id) => {
              const option = employees.find((opt) => opt.id === id);
              return option ? (
                <div className="d-flex" key={id}>
                  <button
                    className="selected-item"
                    onClick={() => removeFilter("employee", id)}
                  >
                    {option.name} {option.surname}
                    <img src="/assets/icons/x (1).svg" alt="remove" />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        )}
        {(confirmedEmployees.length > 0 ||
          confirmedDepartments.length > 0 ||
          confirmedPriorities.length > 0) && (
          <button className="clear" onClick={() => removeFilter("clear")}>
            გასუფთავება
          </button>
        )}
      </div>

      <div>
        <StatusBar tasks={filteredTasks} />
      </div>
    </main>
  );
}

export default Body;
DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};
