import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    btNumber: "",
    forkliftCondition: false,
    hornWorking: false,
    brakesWorking: false,
    seatbeltFunctional: false,
    lightsFunctional: false,
    fluidLeaks: false,
    tireCondition: false,
    supervisorName: "",
    shift: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { btNumber, supervisorName, shift, comments, ...checklist } = formData;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/send`, {
        btNumber,
  supervisorName,
  shift,
  checklist,
  comments,
});

      alert("Checklist submitted successfully!");
      setFormData({
        btNumber: "",
        forkliftCondition: false,
        hornWorking: false,
        brakesWorking: false,
        seatbeltFunctional: false,
        lightsFunctional: false,
        fluidLeaks: false,
        tireCondition: false,
        supervisorName: "",
        shift: "",
        comments: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting checklist");
    }
  };

  return (
    <div className="container">
      <img src="/gray_ridge.png" alt="Gray Ridge Eggs" className="logo" />
      <h1>Power Equipment Safety Checklist</h1>
      <p className="subtitle">Forklift Daily Inspection</p>

      <form onSubmit={handleSubmit}>
        <div className="dropdowns">
    <div>
            <label htmlFor="btNumber">
              <strong>BT Number:</strong>
            </label>
            <input
              type="text"
              name="btNumber"
              value={formData.btNumber}
              onChange={handleChange}
              placeholder="Enter BT Number"
              required
            />
          </div>
          <div>
            <label htmlFor="supervisorName">
              <strong>Supervisor Name:</strong>
            </label>
            <select
              name="supervisorName"
              value={formData.supervisorName}
              onChange={handleChange}
              required
            >
              <option value="">Select Supervisor</option>
              <option value="Jennifer Jurjens">Jennifer Jurjens</option>
              <option value="Rupesh Gautam">Rupesh Gautam</option>
              <option value="Darsan Sundesa">Darsan Sundesa</option>
              <option value="Debie Cator">Debie Cator</option>
            </select>
          </div>

          <div>
            <label htmlFor="shift">
              <strong>Shift:</strong>
            </label>
            <select
              name="shift"
              value={formData.shift}
              onChange={handleChange}
              required
            >
              <option value="">Select Shift</option>
              <option value="400 AM">400 AM</option>
              <option value="500 AM">500 AM</option>
              <option value="400 PM">400 PM</option>
              <option value="500 PM">500 PM</option>
            </select>
          </div>
        </div>

        <div className="checklist">
          {[
            { label: "Forklift in good condition", name: "forkliftCondition" },
            { label: "Horn is working", name: "hornWorking" },
            { label: "Brakes are functional", name: "brakesWorking" },
            { label: "Seatbelt is functional", name: "seatbeltFunctional" },
            { label: "Lights are functional", name: "lightsFunctional" },
            { label: "No visible fluid leaks", name: "fluidLeaks" },
            { label: "Tires are in good condition", name: "tireCondition" },
          ].map((item) => (
            <label className="checklist-item" key={item.name}>
              <input
                type="checkbox"
                name={item.name}
                checked={formData[item.name]}
                onChange={handleChange}
              />
              {item.label}
            </label>
          ))}
        </div>

        <label className="comments-label">Additional Comments:</label>
        <textarea
          name="comments"
          rows="4"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Enter comments here..."
        />

        <button type="submit">Submit Checklist</button>
      </form>
    </div>
  );
}

export default App;
