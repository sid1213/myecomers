import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentUserState {
  userIndex: number;
  logged: boolean;
}
const currentUser: CurrentUserState = {
  userIndex: -1,
  logged: false,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: currentUser,
  reducers: {
    setLogStatus(state, action: PayloadAction<CurrentUserState>) {
      state.userIndex = action.payload.userIndex;
      state.logged = action.payload.logged;
    },
  },
});
export const { setLogStatus } = currentUserSlice.actions;

export default currentUserSlice.reducer;
