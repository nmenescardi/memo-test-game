export default function calculateScore(attempts: number, pairsAmount: number): number {
  if (attempts === 0) return 0;

  return Math.round(pairsAmount / attempts) * 100;
}
