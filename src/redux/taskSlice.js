import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskItem: [],
};

export const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTaskToList: (state, actions) => {
      state.taskItem = actions.payload;
    },
  },
});

export const { addTaskToList } = TaskSlice.actions;
export default TaskSlice.reducer;
