import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

const Project = ({ project }) => {
  const projectsContext = useContext(ProjectContext);
  const { currentProject } = projectsContext;

  const tasksContext = useContext(TaskContext);
  const { getTasks } = tasksContext;

  const handleClick = () => {
    currentProject(project._id);
    getTasks(project._id);
  };

  return (
    <li>
      <button type="button" className="btn btn-blank" onClick={handleClick}>
        {project.name}
      </button>
    </li>
  );
};

export default Project;
