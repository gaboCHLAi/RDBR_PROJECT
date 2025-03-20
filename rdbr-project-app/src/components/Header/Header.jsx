import React, { useState,  createContext, useContext } from "react";
import mainLogo from "../../../public/assets/images/Frame 1000006027.png";
import AddEmployee from "../pages/AddEmployee/AddEmployee";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import AddTask from "../pages/AddTask/AddTask";
export const DataContext = createContext(null);

 
export const ActiveProvider = ({children}) => {
  const [active, setActive] = useState(false);
  
  return (
    <DataContext.Provider value={{ setActive, active }}>
      {children}
    </DataContext.Provider>
  );
};
function Header() {
   const {active, setActive} = useContext(DataContext)
  const navigate = useNavigate();

  const Toggle = () => {
    setActive(!active);
  };

  return (
    <main>
      <div style={{ padding: "0 118px" }}>
        {active && (
           
             <AddEmployee className="position-relative"  />
           
           
        )}
        <div className="navBar d-flex justify-content-between align-items-center">
          <button
            onClick={() => navigate("/")}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <img src={mainLogo} alt="MainLogo" />
          </button>
          <div className="wrapButton">
            <button onClick={Toggle} className={active ? "popup" : "default"}>
              თანამშრომლის შექმნა
            </button>

            <button onClick={() => navigate("/AddTask")}>
              + შექმენი ახალი დავალება
            </button>
          </div>
        </div>
      </div>
      
    </main>
  );
}

export default Header;
