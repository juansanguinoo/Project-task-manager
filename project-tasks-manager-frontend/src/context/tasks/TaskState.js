import { useReducer } from 'react';
import TaskContext from './TaskContext';
import { TaskReducer } from './TaskReducer';

import axiosClient from '../../config/axios';

import {
  TASKS_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  CURRENT_TASK,
  UPDATE_TASK,
  CLEAN_TASK,
} from '../../types';

const TaskState = (props) => {
  const initialState = {
    tasksProject: [],
    tasksError: false,
    selectedTask: null,
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const getTasks = async (project) => {
    try {
      const response = await axiosClient.get('/api/tasks', {
        params: { project },
      });

      dispatch({
        type: TASKS_PROJECT,
        payload: response.data.tasks,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axiosClient.post('/api/tasks', task);
      console.log(response);

      dispatch({
        type: ADD_TASK,
        payload: task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };

  const deleteTask = async (taskId, project) => {
    try {
      await axiosClient.delete(`/api/tasks/${taskId}`, { params: { project } });
      dispatch({
        type: DELETE_TASK,
        payload: taskId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (task) => {
    try {
      const response = await axiosClient.put(`/api/tasks/${task._id}`, task);
      console.log(response);

      dispatch({
        type: UPDATE_TASK,
        payload: response.data.existTask,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveCurrentTask = (task) => {
    dispatch({
      type: CURRENT_TASK,
      payload: task,
    });
  };

  const cleanTask = () => {
    dispatch({
      type: CLEAN_TASK,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasksProject: state.tasksProject,
        tasksError: state.tasksError,
        selectedTask: state.selectedTask,
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        saveCurrentTask,
        updateTask,
        cleanTask,
      }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
