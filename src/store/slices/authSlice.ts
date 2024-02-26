import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AgentType } from '../../api/agent/types';

export interface AuthState {
  agent: AgentType | null;
}

const initialState: AuthState = {
  agent: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAgent: (state, action: PayloadAction<AgentType | null>) => {
      state.agent = action.payload;
    },
  },
});

export const { setAgent } = authSlice.actions;
export default authSlice.reducer;
