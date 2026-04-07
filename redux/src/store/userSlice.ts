import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authenticate, User } from '../api/authenticate';
import { authorize } from '../api/authorize';

type State = {
  user: undefined | User;
  permissions: undefined | string[];
  loading: boolean;
};

const initialState: State = {
  user: undefined,
  permissions: undefined,
  loading: false,
};

export const loginUser = createAsyncThunk('user/login', async () => {
  const authenticatedUser = await authenticate();
  if (!authenticatedUser) {
    throw new Error('Authentication failed');
  }

  const authorizedPermissions = await authorize(authenticatedUser.id);

  return {
    user: authenticatedUser,
    permissions: authorizedPermissions,
  };
});

export const userSlice = createSlice({
  name: 'user',
  initialState, // <-- Use the strongly-typed variable here!
  reducers: {},

  /* extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // TypeScript knows exactly what action.payload looks like
        // because it inferred it from the return statement of your Thunk!
        state.user = action.payload.user;
        state.permissions = action.payload.permissions;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        // Use 'undefined' instead of 'null' or '[]' to perfectly match your State type
        state.user = undefined;
        state.permissions = undefined;
      });
  }, */
});

export default userSlice.reducer;
