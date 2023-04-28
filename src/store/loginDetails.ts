import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentUserState {
  userIndex: number;
  logged: boolean;
}
export const getCurrentUser = (): CurrentUserState => {
  let currentUserBox = sessionStorage.getItem("currentUser");
  if (currentUserBox) {
    return JSON.parse(currentUserBox || "");
  } else {
    return { userIndex: -1, logged: false };
  }
};

const currentUser = getCurrentUser();

export const setCurrentUser = (state: CurrentUserState) => {
  sessionStorage.setItem("currentUser", JSON.stringify(state));
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: currentUser,
  reducers: {
    setLogStatus(state, action: PayloadAction<CurrentUserState>) {
      state.userIndex = action.payload.userIndex;
      state.logged = action.payload.logged;
      setCurrentUser(state);
    },
  },
});
export const { setLogStatus } = currentUserSlice.actions;

export default currentUserSlice.reducer;
