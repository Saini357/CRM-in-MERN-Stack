import React, { useEffect, useState } from "react";
import "../CSS/Home.css";
import axios from "axios";
import Model from "react-modal";
import MeetingForm from "./MeetingForm";
import { Trash2 } from "lucide-react";
import { PenSquare } from "lucide-react";

function Home() {
  const [meetings, setMeetings] = useState([]);
  const [visible, setVisible] = useState(false);
  const [updateID, setUpdateID] = useState();

  const fetchMeetings = async () => {
    try {
      const response = await axios.get("http://localhost:1212/meetings");
      setMeetings(response.data.result);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleMeetingFormSubmit = () => {
    fetchMeetings();
  };

  const handleDelete = async (id) => {
    try {
      const deletedmeeting = await axios.delete(
        `http://localhost:1212/delete/meeting/${id}`
      );
      if (deletedmeeting) {
        setMeetings((prevMeetings) =>
          prevMeetings.filter((meeting) => meeting._id !== id)
        );
      }
    } catch (error) {
      console.log(error, "error in meeting deletion");
    }
  };

  const handleUpdate = (id) => {
    if (id) {
      setVisible(true);
      setUpdateID(id);
    }
  };

  return (
    <div className="homeContainer">
      <div>
        <h3>Welcome to the Web Blaze Softech</h3>
        <button onClick={() => setVisible(true)}>Schedule Meeting</button>

        {updateID ? (
          <Model isOpen={visible} appElement={document.getElementById("root")}>
            <MeetingForm
              onClose={() => {
                setVisible(false);
                setUpdateID(null);
              }}
              onSubmitSuccess={handleMeetingFormSubmit}
              ID={updateID}
            />
          </Model>
        ) : (
          <Model isOpen={visible} appElement={document.getElementById("root")}>
            <MeetingForm
              onClose={() => setVisible(false)}
              onSubmitSuccess={handleMeetingFormSubmit}
            />
          </Model>
        )}
      </div>

      <div>
        <h3>Meetings</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Host</th>
              <th>Subject</th>
              <th>Client Name</th>
              <th>Client Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.subject}</td>
                <td>{item.clientname}</td>
                <td>{item.email}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => handleDelete(item._id)}>
                    <Trash2 />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleUpdate(item._id)}>
                    <PenSquare />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
