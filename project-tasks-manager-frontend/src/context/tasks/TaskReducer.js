import {
  TASKS_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  CURRENT_TASK,
  UPDATE_TASK,
  CLEAN_TASK,
} from '../../types';

export const TaskReducer = (state, action) => {
  switch (action.type) {
    case TASKS_PROJECT:
      return {
        ...state,
        tasksProject: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasksProject: [action.payload, ...state.tasksProject],
        tasksError: false,
      };
    case VALIDATE_TASK:
      return {
        ...state,
        tasksError: true,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasksProject: state.tasksProject.filter(
          (task) => task._id !== action.payload
        ),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasksProject: state.tasksProject.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case CURRENT_TASK:
      return {
        ...state,
        selectedTask: action.payload,
      };
    case CLEAN_TASK:
      return {
        ...state,
        selectedTask: null,
      };
    default:
      return state;
  }
};
