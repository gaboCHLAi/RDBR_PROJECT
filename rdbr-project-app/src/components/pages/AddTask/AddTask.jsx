import React, { useState, useEffect, useContext  } from "react";
import "./AddTask.scss";
import Header from "../../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../dataManager/MyContext";
import { Dropdown } from "react-bootstrap";
import AddEmployee from "../AddEmployee/AddEmployee";
import { DataContext } from "../../Header/Header";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const navigate = useNavigate();
  const { departments, priorities, employees, statuses, addTask } =
    useContext(MyContext);
  const { setActive, active } = useContext(DataContext);
  const [date, setDate] = useState("");
  const [titleErrorColor, setTitleErrorColor] = useState("#DDD2FF");
  const [descriptionErrorColor, setDescriptionErrorColor] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [validation, SetValidation] = useState(false);
  useEffect(() => {
    if (selectedDepartment) {
      setFilteredEmployees(
        employees.filter((emp) => emp.department.id === selectedDepartment.id)
      );
    } else {
      setFilteredEmployees([]);
    }
  }, [selectedDepartment, employees]);

  useEffect(() => {
    if (selectedEmployee) {
      console.log("Employee selected:", selectedEmployee);
    }
  }, [selectedEmployee]);
  useEffect(() => {
    console.log(date);
  }, [date]);

  const handleSelect = (name, selectedItem) => {
    switch (name) {
      case "priority":
        setSelectedPriority(selectedItem);
        console.log(selectedItem);
        break;
      case "status":
        setSelectedStatus(selectedItem);
        console.log(selectedItem);
        break;
      case "department":
        setSelectedDepartment(selectedItem);
        setSelectedEmployee(null);
        break;
      case "employee":
        setSelectedEmployee(selectedItem);
        break;
      default:
        break;
    }
  };

  const valueValidation = () => {
    if (
      titleValue.length < 2 ||
      titleValue.length > 255 ||
      descriptionValue.length < 2 ||
      descriptionValue.length > 255 ||
      selectedPriority === null ||
      selectedStatus === null ||
      selectedDepartment === null ||
      selectedEmployee === null ||
      date === ""
    ) {
      SetValidation(false);
    } else {
      SetValidation(true);
      navigate("/");
    }
    console.log(validation);
  };

  useEffect(() => {
    if (titleValue.length === 0) {
      setTitleErrorColor("#6C757D");
    } else if (titleValue.length < 2 || titleValue.length > 255) {
      setTitleErrorColor("#FA4D4D");
    } else {
      setTitleErrorColor("#08A508");
    }
  }, [titleValue]);

  useEffect(() => {
    if (descriptionValue.length === 0) {
      setDescriptionErrorColor("#6C757D");
    } else if (descriptionValue.length < 2 || descriptionValue.length > 255) {
      setDescriptionErrorColor("#FA4D4D");
    } else {
      setDescriptionErrorColor("#08A508");
    }
  }, [descriptionValue]);

  const inputValueHandler = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitleValue(value);
    } else if (name === "description") {
      setDescriptionValue(value);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (validation === false) {
      return;
    }

    const newTask = {
      name: titleValue,
      description: descriptionValue,
      due_date: date,
      status: selectedStatus ? selectedStatus.id : null,
      priority: selectedPriority ? selectedPriority.id : null,
      department: selectedDepartment ? selectedDepartment.id : null,
      employee: selectedEmployee ? selectedEmployee.id : null,
    };

    addTask(newTask)
      .then(() => {
        valueValidation();
      })
      .catch((error) => {
        console.error("  Error adding task:", error);
      });
  };

  const DropDown = ({
    name,
    options = [],
    initialName,
    className = "",
    onSelect,
  }) => {
    const [selectedOption, setSelectedOption] = useState(
      name === "პასუხისმგებელი თანამშრომელი"
        ? ""
        : options.find((option) => option.name === initialName) || options[0]
    );
    const [isOpen, setIsOpen] = useState(false);

    const isDisabled =
      name === "პასუხისმგებელი თანამშრომელი" && !selectedDepartment;

    useEffect(() => {
      if (initialName) {
        setSelectedOption(
          options.find((option) => option.name === initialName)
        );
      }
    }, [initialName, options]);

    return (
      <>
        <Dropdown
          className={`position-relative dropdown-container p-0 ${className}`}
          onToggle={(isOpen) => setIsOpen(isOpen)}
        >
          <div className="dropdown-toggle-wrapper">
            <Dropdown.Toggle className="dropdown-toggle" disabled={isDisabled}>
              <div className="d-flex justify-content-between">
                <div>
                  {name === "პრიორიტეტი" && selectedOption?.icon && (
                    <img
                      src={selectedOption.icon}
                      alt="icon"
                      className="icon"
                    />
                  )}{" "}
                  {name === "პასუხისმგებელი თანამშრომელი" &&
                  selectedOption?.avatar ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <img
                        src={selectedOption?.avatar}
                        alt="icon"
                        className="icon"
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                        }}
                      />
                      <span>
                        {selectedOption?.name} {selectedOption?.surname}
                      </span>
                    </div>
                  ) : (
                    <span>{selectedOption?.name}</span>
                  )}
                </div>
                <img
                  src={
                    isOpen
                      ? "/assets/images/Vector.png"
                      : "/assets/icons/Icon.svg"
                  }
                  alt="icon"
                />
              </div>
            </Dropdown.Toggle>
          </div>

          <Dropdown.Menu className="custom-dropdown-menu">
            {name === "პასუხისმგებელი თანამშრომელი" && (
              <Dropdown.Item as="button" onClick={() => setActive(true)}>
                <div className="d-flex align-items-center">
                  <img src="/assets/icons/Frame 1000006008.svg" alt="plus" />
                  <p
                    style={{ margin: "0", marginLeft: "8px", color: "#8338EC" }}
                  >
                    დაამატე თანამშრომელი
                  </p>
                </div>
              </Dropdown.Item>
            )}
            {options.length > 0 ? (
              options.map((option) => (
                <Dropdown.Item
                  key={option.id}
                  onClick={() => {
                    setSelectedOption(option);
                    onSelect(option);
                  }}
                  as="button"
                  href="#"
                  className="dropdown-item"
                >
                  {name === "პრიორიტეტი" && option.icon && (
                    <img src={option.icon} alt="icon" className="icon" />
                  )}
                  {name === "პასუხისმგებელი თანამშრომელი" && option.avatar ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <img
                        src={option.avatar}
                        alt="icon"
                        className="icon"
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                        }}
                      />
                      <span>
                        {option.name} {option.surname}
                      </span>
                    </div>
                  ) : (
                    <span>{option.name}</span>
                  )}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item as="button" disabled>
                მონაცემები არ არის
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        {active && <AddEmployee />}
      </>
    );
  };

  return (
    <div>
      <Header />
      <form className="form" onSubmit={handleAddTask}>
        <div className="d-flex">
          <div>
            <div className="d-flex flex-column ">
              <label htmlFor="title">სათაური*</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={inputValueHandler}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: titleErrorColor }}
                className="FontAwesomeIcon"
              />
              <h5 style={{ color: titleErrorColor }}>მინიმუმ 2 სიმბოლო</h5>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: titleErrorColor }}
                className="FontAwesomeIcon"
              />
              <h5 style={{ color: titleErrorColor }}>მაქსიმუმ 255 სიმბოლო</h5>
            </div>
            <div className="d-flex flex-column  description ">
              <label htmlFor="description">აღწერა:</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                cols="50"
                placeholder="შეიყვანეთ თქვენი აღწერა აქ..."
                onChange={inputValueHandler}
              ></textarea>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: descriptionErrorColor }}
                className="FontAwesomeIcon"
              />
              <h5 style={{ color: descriptionErrorColor }}>
                მაქსიმუმ 255 სიმბოლო
              </h5>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: descriptionErrorColor }}
                className="FontAwesomeIcon"
              />
              <h5 style={{ color: descriptionErrorColor }}>
                მაქსიმუმ 255 სიმბოლო
              </h5>
            </div>
            <div
              style={{ display: "flex", columnGap: "32px", marginTop: "55px" }}
            >
              <div>
                <label htmlFor="priority">პრიორიტეტი*</label>
                <DropDown
                  name="პრიორიტეტი"
                  initialName={selectedPriority?.name || " "}
                  options={priorities || []}
                  onSelect={(selectedItem) =>
                    handleSelect("priority", selectedItem)
                  }
                />
              </div>
              <div>
                <label htmlFor="სტატუსი">სტატუსი*</label>
                <DropDown
                  name="სტატუსი"
                  initialName={selectedStatus?.name || "დასაწყები"}
                  options={statuses || []}
                  onSelect={(selectedItem) =>
                    handleSelect("status", selectedItem)
                  }
                />
              </div>
            </div>
          </div>
          <div className="rightSide">
            <div>
              <label htmlFor="department">დეპარტამენტი*</label>
              <DropDown
                name="დეპარტამენტი"
                initialName={selectedDepartment ? selectedDepartment.name : ""}
                options={departments}
                onSelect={(selectedItem) =>
                  handleSelect("department", selectedItem)
                }
              />
            </div>
            <div style={{ margin: "93px 0 169px 0" }}>
              <label htmlFor="employees">პასუხისმგებელი თანამშრომელი</label>
              <DropDown
                name="პასუხისმგებელი თანამშრომელი"
                initialName={selectedEmployee ? selectedEmployee.name : ""}
                options={filteredEmployees}
                onSelect={(selectedItem) =>
                  handleSelect("employee", selectedItem)
                }
              />
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div className="d-flex flex-column">
                <label htmlFor="data">დედლაინი</label>
                <input
                  type="datetime-local"
                  id="datetimeInput"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div>
              <button
                className="AddEmployee"
                onClick={() => {
                  valueValidation();
                 
                }}
                type="submit"
              >
                დავალების შექმნა{" "}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
