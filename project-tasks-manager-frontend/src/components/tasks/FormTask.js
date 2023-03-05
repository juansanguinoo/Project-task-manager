import React, { useContext, useState, useEffect } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

const FormTask = () => {
  const [task, setTask] = useState({
    name: '',
  });

  const { name } = task;

  const projectsContext = useContext(ProjectContext);
  const { project } = projectsContext;

  const tasksContext = useContext(TaskContext);
  const {
    selectedTask,
    tasksError,
    addTask,
    validateTask,
    getTasks,
    updateTask,
    cleanTask,
  } = tasksContext;

  useEffect(() => {
    if (selectedTask !== null) {
      setTask(selectedTask);
    } else {
      setTask({
        name: '',
      });
    }
  }, [selectedTask]);

  if (!project) return null;

  const [currentProject] = project;

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      validateTask();
      return;
    }

    if (selectedTask === null) {
      task.project = currentProject._id;
      addTask(task);
    } else {
      updateTask(task);
      cleanTask();
    }

    getTasks(currentProject._id);

    setTask({
      name: '',
    });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            className="input-text"
            placeholder="Task Name..."
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <input
            type="submit"
            className="btn btn-primary btn-submit btn-block"
            value={selectedTask ? 'Edit Task' : 'Add Task'}
          />
        </div>
      </form>
      {tasksError ? (
        <p className="message error">Task name is required</p>
      ) : null}
    </div>
  );
};

export default FormTask;
