import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserState {
  id: string;
  name: string;
}

const initialState: { users: UserState[] } = {
  users: [
    { id: "0", name: "Subash Karki" },
    { id: "1", name: "John Doe" },
    { id: "2", name: "Sanjay Gupta" },
    { id: "3", name: "Hari Bahadur" },
  ],
};

const userSlice = createSlice({
  name: "users",
  initialState: initialState.users,
  reducers: {},
});

export const selectAllUsers = (state: RootState) => state.users;

export const {} = userSlice.actions;
export default userSlice.reducer;
