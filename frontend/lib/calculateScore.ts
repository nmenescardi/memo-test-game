export default function calculateScore(attempts: number, pairsAmount: number): number {
  if (attempts === 0) return 0;

  const base = 1.05;

  return Math.round(pairsAmount * Math.pow(base, -attempts) * 100);
}
