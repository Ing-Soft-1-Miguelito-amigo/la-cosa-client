import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playerId: 0,
    gameId: 0,
};

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const { playerId, gameId } = action.payload;
            state.gameId = gameId,
            state.playerId = playerId;
        },
    },
})

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
