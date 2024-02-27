import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AgentType } from '../../api/agent/types';

export interface AuthState {
  agent: AgentType | null;
  token: string | null;
}

const initialState: AuthState = {
  agent: null,
  token: localStorage.getItem('space-traders-token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAgent: (state, action: PayloadAction<AgentType | null>) => {
      state.agent = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setAgent, setToken } = authSlice.actions;
export default authSlice.reducer;
