import { createSlice } from '@reduxjs/toolkit';

export interface NavState {
  waypoint: string | null;
}

const initialState: NavState = {
  waypoint: null,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setWaypoint: (state, action) => {
      state.waypoint = action.payload;
    },
  },
});

export const { setWaypoint } = navSlice.actions;
export default navSlice.reducer;
