import React, { useEffect, useState } from "react";
import AddProjectForm from "./AddProjectForm";
import Model from "react-modal";
import axios from "axios";
import { Info } from "lucide-react";
import { Trash2 } from "lucide-react";
import "../CSS/Project.css";
import ProjectInfo from "./ProjectInfo";

function Project() {
  const [visible, setVisible] = useState(false);
  const [project, setProject] = useState([]);
  const [info, setInfo] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get("http://localhost:1212/projects");
        setProject(response.data);
      } catch (error) {
        console.log(error, "error in fetching projects");
      }
    };
    fetchProject();
  }, []);

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:1212/delete/projects/${id}`);
    } catch (error) {
      console.log(error, "error in delete project");
    }
  };

  const handleInfo = (id) => {
    setSelectedId(id);
    setInfo(true);
  };

  return (
    <div>
      <div className="buttonProject">
        <button className="btnProject" onClick={() => setVisible(true)}>
          Add Project
        </button>

        <Model isOpen={visible} appElement={document.getElementById("root")}>
          <AddProjectForm onClose={() => setVisible(false)} />
        </Model>

        <Model isOpen={info} appElement={document.getElementById("root")}>
          <ProjectInfo Id={selectedId} onClose={() => setInfo(false)} />
        </Model>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Status</th>
              <th>Type</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {project.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.status}</td>
                <td>{item.type}</td>
                <td>
                  <button onClick={() => handleInfo(item._id)}>
                    <Info />
                  </button>
                  <button onClick={() => deleteProject(item._id)}>
                    <Trash2 />
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

export default Project;
