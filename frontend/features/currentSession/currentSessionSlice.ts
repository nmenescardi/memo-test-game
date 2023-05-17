import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, StatusEnum } from '@/types';

interface CurrentSessionState {
  gameId: string | null;
  sessionId: string | null;
  cards: Card[];
  retryCount: number;
}

const initialState: CurrentSessionState = {
  gameId: null,
  sessionId: null,
  cards: [],
  retryCount: 0,
};

const currentSessionSlice = createSlice({
  name: 'currentSession',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<{ gameId: string; sessionId: string; cards: Card[] }>) => {
      state.gameId = action.payload.gameId;
      state.sessionId = action.payload.sessionId;
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
      state.sessionId = null;
      state.cards = [];
      state.retryCount = 0;
    },
    modifyStatus: (state, action: PayloadAction<{ position: number; status: StatusEnum }>) => {
      const card = state.cards.find((card) => card.position === action.payload.position);
      if (card) {
        card.status = action.payload.status;
      }
    },
  },
});

export const { startGame, updateCards, incrementRetryCount, endGame, modifyStatus } = currentSessionSlice.actions;

export default currentSessionSlice.reducer;
