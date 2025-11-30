import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  user: null | {
    id: string;
    name: string;
    email: string;
  };
}

const initialState: IInitialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {},
    clearUser: (state) => {},
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
