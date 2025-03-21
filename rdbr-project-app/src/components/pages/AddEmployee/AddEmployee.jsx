import React, { useContext, useState, useEffect, useRef } from "react";
import "./AddEmployee.scss";

import { Dropdown } from "react-bootstrap";
import { MyContext } from "../../../components/dataManager/MyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../Header/Header";
function AddEmployee() {
  const { departments, addEmployee } = useContext(MyContext);
  const { setActive } = useContext(DataContext);
  const [nameValue, setNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [valNameColor, setValNameColor] = useState("#DDD2FF");
  const [valLastnameColor, setValLastnameColor] = useState("#DDD2FF");
  const [error, setError] = useState("");

  const valueValidation = () => {
    if (
      nameValue.length < 2 ||
      nameValue.length > 255 ||
      lastNameValue.length < 2 ||
      lastNameValue.length > 255 ||
      avatar === null ||
      selectedDepartment === ""
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    if (nameValue.length === 0) {
      setValNameColor("#6C757D");
    } else if (nameValue.length < 2 || nameValue.length > 255) {
      setValNameColor("#FA4D4D");
    } else {
      setValNameColor("#08A508");
    }
  }, [nameValue]);

  useEffect(() => {
    if (lastNameValue.length === 0) {
      setValLastnameColor("#6C757D");
    } else if (lastNameValue.length < 2 || lastNameValue.length > 255) {
      setValLastnameColor("#FA4D4D");
    } else {
      setValLastnameColor("#08A508");
    }
  }, [lastNameValue]);

  const inputValueHandler = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setNameValue(value);
    } else if (name === "lastName") {
      setLastNameValue(value);
    }
  };
  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 600 * 1024) {
        alert("File size must be under 600KB!");
        return;
      }
      setAvatar(file);
    }
  };

  const handleRemoveAvatar = (e) => {
    e.stopPropagation();
    setAvatar(null);
  };

  const handleClose = () => {
    setActive(false);
  };

  const handleSelect = (depName, event) => {
    setSelectedDepartment(depName);
    event.preventDefault();
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();

    const newEmployee = {
      name: nameValue,
      surname: lastNameValue,
      avatar: avatar,
      department_id: departments.find((dep) => dep.name === selectedDepartment)
        ?.id,
    };

    addEmployee(newEmployee)
      .then(() => {
        valueValidation();
      })
      .catch((error) => {
        console.error("  Error adding employee:", error);
      });
  };

  return (
    <div>
      <div className="overlay" onClick={handleClose}></div>
      <div className="main-container">
        <button onClick={handleClose} className="turnoff" aria-label="Close">
          <img src="\RDBR_PROJECT\assets\icons\Vector (1).svg" alt="Arrow" />
        </button>
        <p className="title">თანამშრომლის დამატება</p>
        {error && (
          <p className="error-message" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <form>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <label htmlFor="name">სახელი*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={nameValue}
                onChange={inputValueHandler}
              />
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: valNameColor }}
                  className="FontAwesomeIcon"
                />
                <h5 style={{ color: valNameColor }}>მინიმუმ 2 სიმბოლო</h5>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: valNameColor }}
                  className="FontAwesomeIcon"
                />
                <h5 style={{ color: valNameColor }}>მაქსიმუმ 255 სიმბოლო</h5>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <label htmlFor="lastName">გვარი*</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastNameValue}
                onChange={inputValueHandler}
              />
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: valLastnameColor }}
                  className="FontAwesomeIcon"
                />
                <h5 style={{ color: valLastnameColor }}>მინიმუმ 2 სიმბოლო</h5>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: valLastnameColor }}
                  className="FontAwesomeIcon"
                />
                <h5 style={{ color: valLastnameColor }}>
                  მაქსიმუმ 255 სიმბოლო
                </h5>
              </div>
            </div>
          </div>

          <div className="wrapImageBlock">
            <span>ავატარი*</span>
            <div className="d-flex flex-column  justify-content-center align-items-center imageBlock  ">
              <div
                className="avatar-upload"
                style={{ width: avatar ? "88px" : "100%" }}
                onClick={handleDivClick}
              >
                <img
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : "  /RDBR_PROJECT/assets/icons/Frame 1000005790.svg"
                  }
                  alt="Avatar"
                  style={{
                    width: avatar ? "100%" : "24px",
                    height: avatar ? "100%" : "24px",
                    objectFit: avatar ? "cover" : "contain",
                    borderRadius: "50%",
                  }}
                />
                {avatar ? null : <span>ატვირთე ფოტო</span>}
                {avatar && (
                  <button
                    onClick={handleRemoveAvatar}
                    className="delete-button"
                  >
                    <img
                      src=" /assets/icons/Frame 1000006036.svg"
                      alt="remove-avatar"
                    />
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleAvatarChange}
                style={{
                  display: "none",
                }}
              />
            </div>
          </div>

          <div>
            <span className="dep">დეპარტამენტი*</span>
            <Dropdown>
              <Dropdown.Toggle variant="secondary">
                {selectedDepartment}
                <img
                  src=" /RDBR_PROJECT/assets/icons/Icon.svg"
                  alt="Arrow"
                  className="arrow"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="custom-dropdown-menu">
                {departments.map((dep) => (
                  <Dropdown.Item
                    key={dep.id}
                    as="button"
                    onClick={(event) => {
                      handleSelect(dep.name, event);
                    }}
                  >
                    {dep.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="wrapButton">
            <button onClick={handleClose}>გაუქმება</button>
            <button onClick={handleAddEmployee}>დაამატე თანამშრომელი</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
