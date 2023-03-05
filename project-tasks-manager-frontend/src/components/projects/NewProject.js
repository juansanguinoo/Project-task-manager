import React, { useState, useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';

const NewProject = () => {
  const projectsContext = useContext(ProjectContext);
  const { form, errorForm, showForm, addProject, showError } = projectsContext;

  const [project, setProject] = useState({
    name: '',
  });

  const { name } = project;

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '') {
      showError();
      return;
    }

    addProject(project);

    setProject({
      name: '',
    });
  };

  const handleClick = () => {
    showForm();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primary"
        onClick={handleClick}>
        New Project
      </button>

      {form ? (
        <form className="form-new-project" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Project Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <input
            type="submit"
            className="btn btn-block btn-primary btn-block"
            value="Add Project"
          />
        </form>
      ) : null}
      {errorForm ? (
        <p className="message error">Project name is required</p>
      ) : null}
    </>
  );
};

export default NewProject;
