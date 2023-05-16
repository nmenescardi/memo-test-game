import GameSession from '@/components/GameSession';

type GameSessionPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    isNewGame?: boolean;
  };
};

const GameSessionPage: React.FC<GameSessionPageProps> = ({ params, searchParams }) => {
  const { id } = params;

  const { isNewGame = false } = searchParams;
  return <GameSession gameId={id} isNewGame={isNewGame} />;
};

export default GameSessionPage;
