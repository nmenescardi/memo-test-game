import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import MemoTests from '@/components/MemoTests';
import { mockResult as mockResultData } from '@/__mocks__/useQueryResult';

jest.mock('@apollo/client');
jest.mock('react-redux');

const mockResult = {
  data: mockResultData,
  loading: false,
  error: null,
};

const mockState = {
  currentSession: null,
};

describe('MemoTests', () => {
  afterEach(cleanup);

  it('renders the memo tests when they have loaded', async () => {
    (useQuery as jest.Mock).mockReturnValue(mockResult);
    (useSelector as jest.Mock).mockReturnValue(mockState);

    let container: any;
    let getByText: any;
    await act(async () => {
      const rendered = render(<MemoTests />);
      getByText = rendered.getByText;
      container = rendered.container;
    });

    expect(getByText('Select a game to start playing:')).toBeInTheDocument();

    mockResult.data.memoTests.forEach((memoTest) => {
      expect(getByText(memoTest.name)).toBeInTheDocument();
    });

    const omnisElement = getByText('omnis');
    expect(omnisElement).toBeInTheDocument();

    const citiesElement = getByText('Cities - 4 Pairs');
    expect(citiesElement).toBeInTheDocument();

    const scoreElement = getByText('329', { exact: false });

    // Making sure the score is in the same box as the game name
    const gameBox = citiesElement.parentElement;
    expect(gameBox).toContainElement(scoreElement);
  });
});
