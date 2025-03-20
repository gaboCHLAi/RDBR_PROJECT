import React, { useEffect, useState } from "react";
import "./Card.scss";

function Card() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const requestUser = async () => {
      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/priorities"
      );
      const data = await response.json();

      console.log(data);
      setUsers(data);
    };
    requestUser();
  }, []);

  return (
    <div className="user-cards">
      {users && users.map(user => (
        <div key={user.id} className={`card ${user.name}`}>
          <h3>{user.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Card;
