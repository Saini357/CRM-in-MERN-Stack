import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useFormik } from "formik";
// import "../CSS/AddProjectForm.css";
// import Multiselect from "multiselect-react-dropdown";

function AddProjectForm({ onClose }) {
  const [Client, setClient] = useState([]);
  const [developer, setDeveloper] = useState([]);

  const initialValues = {
    name: "",
    type: "",
    technology: "",
    clientId: "",
    description: "",
    status: "",
    developersId: [],
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:1212/create/project",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data submitted successfully:", response.data);
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.type) {
      errors.type = "Type is required";
    }

    if (!values.technology) {
      errors.technology = "Technology is required";
    }

    if (!values.clientId) {
      errors.clientId = "Client is required";
    }

    if (!values.description) {
      errors.description = "Description is required";
    }

    if (!values.status) {
      errors.status = "Status is required";
    }

    if (values.developersId.length === 0) {
      errors.developersId = "At least one developer must be selected";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1212/client/getclients"
        );
        console.log(response);
        setClient(response.data.clients);
      } catch (error) {
        console.log("error in client fetching", error);
      }
    };

    const fetchDevelopers = async () => {
      try {
        const response = await axios.get("http://localhost:1212/getuser");
        setDeveloper(response.data);
      } catch (error) {
        console.log("error in fetching developers", error);
        return [];
      }
    };

    fetchClients();
    fetchDevelopers();
  }, []);

  return (
    <div>
      <button className="close-button" onClick={onClose}>
        <X size={20} />
      </button>
      <div className="formContainer">
        <form onSubmit={formik.handleSubmit}>
          <h2>Project Information Form</h2>
          {/* Name */}
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}
          {/* Type */}
          <label htmlFor="type">Type:</label>
          <input
            id="type"
            name="type"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.type}
          />
          {/* Technology */}
          <label htmlFor="technology">Technology:</label>
          <input
            id="technology"
            name="technology"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.technology}
          />
          {/* Client */}
          <label htmlFor="clientId">Client:</label>
          <select
            id="clientId"
            name="clientId"
            onChange={formik.handleChange}
            value={formik.values.clientId}
          >
            {Client.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
          {/* Description */}
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            onChange={formik.handleChange}
            value={formik.values.description}
          ></textarea>
          {/* Status */}
          <label htmlFor="status">Status:</label>
          <input
            id="status"
            name="status"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.status}
          />
          {/* Developers */}
          {developer.map((item) => (
            <div key={item._id}>
              <input
                type="checkbox"
                id={item._id}
                name="developersId"
                value={item._id}
                onChange={formik.handleChange}
                checked={formik.values.developersId.includes(item._id)}
              />
              <label>{item.name}</label>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddProjectForm;
