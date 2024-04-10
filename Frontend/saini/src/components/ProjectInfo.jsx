import axios from "axios";
import React, { useEffect, useState } from "react";
import "../CSS/ProjectInfo.css";

function ProjectInfo({ Id, onClose }) {
  const [projectInfo, setProjectInfo] = useState(null);

  useEffect(() => {
    const fetchSingleProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1212/singleproject/${Id}`
        );
        console.log(response.data);
        setProjectInfo(response.data);
      } catch (error) {
        console.error("Error in fetching single project:", error);
      }
    };

    if (Id) {
      fetchSingleProject();
    }
  }, [Id]);

  return (
    <div>
      <div className="projectInfoContainer">
        {projectInfo && (
          <div>
            <p>Project Name: {projectInfo.name}</p>
            <p>Project Type: {projectInfo.type}</p>
            <p>Status: {projectInfo.status}</p>
            <p>Technology:{projectInfo.technology}</p>
            <p>Client Name:{projectInfo.clientId.name}</p>
            <p>Description:{projectInfo.description}</p>
            <h3>Assign Developers :</h3>
            {projectInfo.developersId.map((item) => (
              <h4> {item.name}</h4>
            ))}
          </div>
        )}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ProjectInfo;
