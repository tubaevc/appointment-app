import React, { useState, useEffect } from "react";
import axios from "axios";
function UserAppointments() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        console.log("token: " + token);
        const response = await axios.get("/api/user/get-user-appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user appointments:", error);
        console.error(error.response);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {userData && (
        <div>
          <h1>User Appointments</h1>
          <div>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
          </div>
          <div>
            <h2>Appointments</h2>
            {userData.appointments.map((appointment) => (
              <div key={appointment._id}>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAppointments;
