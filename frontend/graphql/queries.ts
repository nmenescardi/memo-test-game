import { gql } from '@apollo/client';

export const getMemoTests = gql`
  query GetMemoTests {
    memoTests {
      id
      name
      highestScore
    }
  }
`;

export const getMemoTest = gql`
  query GetMemoTest($id: ID!) {
    memoTest(id: $id) {
      id
      name
      images
    }
  }
`;
