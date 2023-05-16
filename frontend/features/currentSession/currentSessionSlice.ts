import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '@/types';

interface CurrentSessionState {
  gameId: string | null;
  cards: Card[];
  retryCount: number;
}

const initialState: CurrentSessionState = {
  gameId: null,
  cards: [],
  retryCount: 0,
};

const currentSessionSlice = createSlice({
  name: 'currentSession',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<{ gameId: string; cards: Card[] }>) => {
      state.gameId = action.payload.gameId;
      state.cards = action.payload.cards;
      state.retryCount = 0;
    },
    updateCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    incrementRetryCount: (state) => {
      state.retryCount += 1;
    },
    endGame: (state) => {
      state.gameId = null;
      state.cards = [];
      state.retryCount = 0;
    },
  },
});

export const { startGame, updateCards, incrementRetryCount, endGame } = currentSessionSlice.actions;

export default currentSessionSlice.reducer;
