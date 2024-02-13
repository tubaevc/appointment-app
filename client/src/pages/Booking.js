import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Booking() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    departmentId: "",
    doctorId: "",
    // userId: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    axios
      .get("/api/departments")
      .then((response) => {
        setDepartments(response.data.departments);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const handleDepartmentChange = async (e) => {
    const departmentId = e.target.value;
    setFormData({ ...formData, departmentId });

    try {
      const response = await axios.get(
        `/api/departments/${departmentId}/doctors`
      );
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    setFormData({ ...formData, doctorId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      console.log(typeof userId);
      const response = await axios.post("/api/booking/book", formData);
      if (response.data.success) {
        //  console.log(response.data.data);
      } else {
        console.log(response.data.message);
      }
      console.log("Appointment created successfully");

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };
  useEffect(() => {
    setIsSubmitted(false);
  }, []);

  return (
    <Layout>
      <form
        className="justify-center text-center mt-10"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="font-bold mr-4" htmlFor="department">
            Department:
          </label>
          <select
            id="department"
            value={formData.departmentId}
            onChange={handleDepartmentChange}
          >
            <option value="">Select a department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2">
          <label className="font-bold mr-4" htmlFor="doctor">
            Doctor:
          </label>
          <select
            id="doctor"
            value={formData.doctorId}
            onChange={(e) => {
              handleDoctorChange(e);
            }}
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2">
          <label className="font-bold mr-4" htmlFor="date">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            disabled={!formData.doctorId}
          />
        </div>
        <div className="mt-2">
          <label className="font-bold mr-4" htmlFor="time">
            Time:
          </label>
          <input
            type="time"
            id="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            disabled={!formData.doctorId}
          />
        </div>
        <button
          type="submit"
          className="primary-button bg-[#211C6A] text-white h-[40px] w-[200px] mt-3 mb-3"
        >
          Randevu Al
        </button>
      </form>
    </Layout>
  );
}

export default Booking;
