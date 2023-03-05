import React, { useContext, useEffect } from 'react';
import Bar from '../layout/Bar';
import Sidebar from '../layout/Sidebar';
import FormTask from '../tasks/FormTask';
import ListTasks from '../tasks/ListTasks';
import AuthContext from '../../context/auth/AuthContext';

const Projects = () => {
  const authContext = useContext(AuthContext);
  const { authenticatedUser } = authContext;

  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-app">
      <Sidebar />
      <div className="main-section">
        <Bar />
        <main>
          <FormTask />
          <div className="container-tasks">
            <ListTasks />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
