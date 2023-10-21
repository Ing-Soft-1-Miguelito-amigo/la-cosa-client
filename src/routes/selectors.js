import { createSelector } from "@reduxjs/toolkit";

export const getPlayerId = createSelector(
    (state) => state.userData,
    (userData) => userData.playerId
);

export const getGameId = createSelector(
    (state) => state.userData,
    (userData) => userData.gameId
);
