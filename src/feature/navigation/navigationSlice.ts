import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  history: string[];
}

const initialState: NavigationState = {
  history: [],
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    pushToHistory: (state, action: PayloadAction<string>) => {
      const newPath = action.payload;
      
      if (state.history[state.history.length - 1] !== newPath) {
        state.history.push(newPath);
      }
    },
    popFromHistory: (state) => {
      state.history.pop();
    },
    resetHistory: (state) => {
      state.history = [];
    },
  },
});

export const { pushToHistory, popFromHistory, resetHistory } = navigationSlice.actions;
export default navigationSlice.reducer;
