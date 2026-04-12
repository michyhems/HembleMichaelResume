import projectData from "./../../api/placeholder.json";
import { useState, useEffect } from "react";
import axios from "./../../api/axios";
import { useNavigate } from "react-router-dom";

const Projects = () => {
    const [projectList, setProjectList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const controller = new AbortController();
        const getProjects = async () => {
            try {
                const response = await axios.get(`/titles`, {
                    signal: controller.signal,
                });
                setProjectList(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        getProjects();
        return () => {
            controller.abort();
        };
    }, []);
    return (
        <>
            <h2 className="section-title">PROJECTS</h2>
            <div class="projects">
                {projectList?.length
                    ? projectList.map((project) => (
                          <div
                              class="project-card card"
                              onClick={() => navigate(`blog/${project._id}`)}
                          >
                              <div class="project-card-image">
                                  <img src={project.thumbnail}></img>
                                  <div class="project-card-glass project-card-name">
                                      {project.title}
                                  </div>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </>
    );
};
export default Projects;
