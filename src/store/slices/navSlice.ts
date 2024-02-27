import { createSlice } from '@reduxjs/toolkit';

export interface NavState {
  ship: string | null;
}

const initialState: NavState = {
  ship: null,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setShip: (state, action) => {
      state.ship = action.payload;
    },
  },
});

export const { setShip } = navSlice.actions;
export default navSlice.reducer;
