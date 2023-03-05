import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

const Task = ({ task }) => {
  const projectsContext = useContext(ProjectContext);
  const { project } = projectsContext;

  const [currentProject] = project;

  const tasksContext = useContext(TaskContext);
  const { deleteTask, getTasks, updateTask, saveCurrentTask } = tasksContext;

  const handleDelete = (id) => {
    deleteTask(id, currentProject._id);
    getTasks(currentProject._id);
  };

  const handleState = (task) => {
    if (task.state) {
      task.state = false;
    } else {
      task.state = true;
    }
    updateTask(task);
  };

  const handleEdit = (task) => {
    saveCurrentTask(task);
  };

  return (
    <li className="task shade">
      <p>{task.name}</p>
      <div className="state">
        {task.state ? (
          <button
            type="button"
            className="complete"
            onClick={() => handleState(task)}>
            Complete
          </button>
        ) : (
          <button
            type="button"
            className="incomplete"
            onClick={() => handleState(task)}>
            Incomplete
          </button>
        )}
      </div>

      <div className="actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleEdit(task)}>
          Edit
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => handleDelete(task._id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default Task;
