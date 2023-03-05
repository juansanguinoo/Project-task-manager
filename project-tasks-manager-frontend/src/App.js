import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';

import ProjectState from './context/projects/ProjectState';
import TaskState from './context/tasks/TaskState';
import AlertState from './context/alerts/AlertState';
import AuthState from './context/auth/AuthState';

import authToken from './config/authToken';

const token = localStorage.getItem('token');
if (token) {
  authToken(token);
}

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

const MainRoutes = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/projects" /> : children;
};

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={<MainRoutes children={<Login />}></MainRoutes>}
                />
                <Route
                  path="/new-account"
                  element={<MainRoutes children={<NewAccount />}></MainRoutes>}
                />
                <Route
                  path="/projects"
                  element={
                    <PrivateRoute children={<Projects />}></PrivateRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
