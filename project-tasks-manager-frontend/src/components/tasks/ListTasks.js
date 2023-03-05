import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';
import Task from './Task';
import TaskContext from '../../context/tasks/TaskContext';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListTasks = () => {
  const projectsContext = useContext(ProjectContext);
  const { project, deleteProject } = projectsContext;

  const tasksContext = useContext(TaskContext);
  const { tasksProject } = tasksContext;

  if (!project) return <h2>Select a project</h2>;

  const [currentProject] = project;

  const handleClick = () => {
    deleteProject(currentProject._id);
  };

  return (
    <>
      <h2>Project: {currentProject.name}</h2>
      <ul className="tasks-list">
        {tasksProject.length === 0 ? (
          <li className="task">
            <p>No Tasks</p>
          </li>
        ) : (
          <TransitionGroup>
            {tasksProject.map((task) => (
              <CSSTransition key={task._id} timeout={400} classNames="task">
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button type="button" className="btn btn-delete" onClick={handleClick}>
        Delete Project &times;
      </button>
    </>
  );
};

export default ListTasks;
