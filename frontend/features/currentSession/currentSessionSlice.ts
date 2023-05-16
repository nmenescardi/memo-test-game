import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardStatus {
  id: number;
  status: 'covered' | 'uncovered' | 'matched';
}

interface CurrentSessionState {
  gameId: string | null;
  boardStatus: CardStatus[];
  retryCount: number;
}

const initialState: CurrentSessionState = {
  gameId: null,
  boardStatus: [],
  retryCount: 0,
};

const currentSessionSlice = createSlice({
  name: 'currentSession',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<{ gameId: string; boardStatus: CardStatus[] }>) => {
      state.gameId = action.payload.gameId;
      state.boardStatus = action.payload.boardStatus;
      state.retryCount = 0;
    },
    updateBoardStatus: (state, action: PayloadAction<CardStatus[]>) => {
      state.boardStatus = action.payload;
    },
    incrementRetryCount: (state) => {
      state.retryCount += 1;
    },
    endGame: (state) => {
      state.gameId = null;
      state.boardStatus = [];
      state.retryCount = 0;
    },
  },
});

export const { startGame, updateBoardStatus, incrementRetryCount, endGame } = currentSessionSlice.actions;

export default currentSessionSlice.reducer;
