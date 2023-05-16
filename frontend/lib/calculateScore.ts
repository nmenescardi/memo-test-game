export default function calculateScore(attempts: number, pairsAmount: number): number {
  if (attempts === 0) return 0;

  return Math.round(((100 * pairsAmount) / attempts) * 100) / 100;
}
