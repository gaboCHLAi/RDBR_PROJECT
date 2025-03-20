import React, { useContext, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./Body.scss";
import { MyContext } from "../../components/dataManager/MyContext";
import PropTypes from "prop-types";

const DropDown = ({ name, options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]); 
  const [confirmedOptions, setConfirmedOptions] = useState([]);

  const handleCheckboxChange = (optionId) => {
    setSelectedOptions(
      (prevSelected) =>
        prevSelected.includes(optionId)
          ? prevSelected.filter((id) => id !== optionId)
          : [...prevSelected, optionId]
    );
  };

  return (
    <div className="d-flex flex-column">
    <Dropdown className="custom-dropdown">
      <Dropdown.Toggle>
        {name} <img src="/assets/icons/Icon.svg" alt="Arrow" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map((options) => (
          <Dropdown.Item 
          
            key={options.id}
            href="#"
            onClick={(e) => {
              e.preventDefault(); 
              e.stopPropagation();  
              handleCheckboxChange(options.id); 
            }}
          >
            <div className="d-flex align-items-center">
              {" "}
              <input
                type="checkbox"
                className="checkBox"
                checked={selectedOptions.includes(options.id)}
              />{" "}
              {options.name} {options.surname}
            </div>
          </Dropdown.Item>
        ))}
        <button
        type="submit"
        className="choose"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();  
            setConfirmedOptions(selectedOptions);
            document.body.click();
          }}
        >
          {" "}
          არჩევა
        </button>
      </Dropdown.Menu>
    </Dropdown>
    {confirmedOptions.length > 0 && (
        <div className="selected-options">
          {confirmedOptions.map((id) => {
            const option = options.find((opt) => opt.id === id);
            return (
              <button key={id} className="selected-item">
                {option.name} {option.surname}  
              </button>
            );
          })}
        </div>
      )}
    </div>
    
  );
};

const StatusBar = () => {
  const { departments, priorities, employees, statuses, tasks } =
    useContext(MyContext);
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
        return "ადმინისტრაცია";
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
                <div
                  className="Card"
                  style={{ borderColor: handleColorPro(status.id) }}
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
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

function Body() {
  const { departments, priorities, employees } = useContext(MyContext);
  console.log(departments, priorities, employees);

  return (
    <main className="body">
      <p className="addTask">დავალების გვერდი</p>
      <div className="wrapDropDowns">
        <DropDown name="დეპარტამენტი" options={departments} />
        <DropDown name="პრიორიტეტი" options={priorities} />
        <DropDown name="თანამშრომელი" options={employees} />
      </div>
      <div>
        <StatusBar />
      </div>
    </main>
  );
}

export default Body;
DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};
