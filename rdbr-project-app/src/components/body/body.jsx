import React, { useContext,   } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./Body.scss";
import { MyContext } from "../../components/dataManager/MyContext";
import PropTypes from "prop-types";
 
const DropDown = ({ name, options }) => {
  return (
    <Dropdown className="position-relative">
      <Dropdown.Toggle>
        {name} <img src="/assets/icons/Icon.svg" alt="Arrow" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map((options) => (
          <Dropdown.Item key={options.id} href="#">
            {options.name} {options.surname}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

 

const StatusBar = ({ statuses }) => {
  return (
    <div   >
      {statuses.map((status) => (
        <button className="m-0" key={status.id}>{status.name}</button>
      ))}
    </div>
  );
};

function Body() {
  const { departments, priorities, employees , statuses } = useContext(MyContext);
  console.log(departments, priorities, employees);

 
  return (
    <main  className="body">
      <p className="addTask">დავალების გვერდი</p>
      <div className="wrapDropDowns">
         
        <DropDown
          name="დეპარტამენტი"
          options={departments} 
        />
        <DropDown
          name="პრიორიტეტი"
          options={priorities}  
        />
        <DropDown
          name="თანამშრომელი"
          options={employees} 
        />
      </div>
      <div className="wrapStatus">
        <StatusBar statuses={statuses}
        className = "" />
      </div>
    </main>
  );
}

export default Body;
DropDown.propTypes = {
  name: PropTypes.string.isRequired,  
  options: PropTypes.array.isRequired, 
};
