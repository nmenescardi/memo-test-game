import GameSession from '@/components/GameSession';

export default function GameSessionPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <GameSession gameId={id} />;
}
