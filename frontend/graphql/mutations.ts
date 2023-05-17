import { gql } from '@apollo/client';

export const createGameSession = gql`
  mutation CreateGameSession($input: NewGameSession!) {
    createGameSession(input: $input) {
      id
      memo_test_id
      retries
      number_of_pairs
      state
    }
  }
`;

export const endGameSession = gql`
  mutation EndGameSession($input: EndGameSession!) {
    endGameSession(input: $input) {
      id
      memo_test_id
      retries
      number_of_pairs
      state
    }
  }
`;

export const updateGameSession = gql`
  mutation UpdateGameSession($input: UpdateGameSession!) {
    updateGameSession(input: $input) {
      id
      memo_test_id
      retries
      number_of_pairs
      state
    }
  }
`;
