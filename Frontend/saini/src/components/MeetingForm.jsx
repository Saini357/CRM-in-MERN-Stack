import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

function MeetingForm({ onClose, onSubmitSuccess, ID }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "",
    subject: "",
    date: "",
    clientname: "",
    time: "",
  });

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fetch the single meeting data when ID changes
  useEffect(() => {
    const fetchSingleMeetingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1212/single/meeting/${ID}`
        );
        const fetchedData = response.data.data;
        setFormData(fetchedData);
      } catch (error) {
        console.log(error, "error in get single meeting data");
      }
    };

    if (ID) {
      fetchSingleMeetingData();
    }
  }, [ID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = ID
      ? `http://localhost:1212/update/meeting/${ID}`
      : "http://localhost:1212/create/meeting";

    try {
      const response = await axios({
        method: ID ? "PUT" : "POST",
        url: apiUrl,
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (ID) {
        console.log(response, "Meeting Updation Successfully");
      } else {
        console.log("Meeting created successfully", response);
      }

      onSubmitSuccess();
      onClose();
    } catch (error) {
      if (ID) {
        console.log(error, "error in updation of meeting");
      } else {
        if (error.response && error.response.status === 409) {
          console.log("A meeting with this subject or client already exists.");
        } else {
          console.log("Error in meeting creation", error);
        }
      }
    }
  };

  return (
    <div>
      <div className="form-container">
        <button onClick={onClose}>
          <X />
        </button>
        <h2>Meeting Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Host</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />

          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <label htmlFor="time">Time</label>
          <input
            type="text"
            name="time"
            id="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          <label htmlFor="clientname">Client Name</label>
          <input
            type="text"
            id="clientname"
            name="clientname"
            value={formData.clientname}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default MeetingForm;
