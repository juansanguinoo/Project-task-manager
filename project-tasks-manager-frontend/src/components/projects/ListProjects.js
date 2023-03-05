import React, { useContext, useEffect } from 'react';
import Project from './Project';
import ProjectContext from '../../context/projects/ProjectContext';
import AlertContext from '../../context/alerts/AlertContext';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListProjects = () => {
  const projectsContext = useContext(ProjectContext);
  const { message, projects, getProjects } = projectsContext;

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  useEffect(() => {
    if (message) {
      showAlert(message.msg, message.category);
    }

    getProjects();
    // eslint-disable-next-line
  }, [message]);

  if (projects.length === 0) return <p>No projects, start creating one</p>;

  return (
    <ul className="list-projects">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}

      <TransitionGroup>
        {projects.map((project) => (
          <CSSTransition key={project._id} timeout={200} classNames="project">
            <Project project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListProjects;
