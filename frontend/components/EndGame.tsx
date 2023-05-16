'use client';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const EndGame = ({ score }: { score: number }) => {
  return (
    <div>
      <Typography variant="h4" component="div" gutterBottom>
        Game Over!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your score: {score}
      </Typography>
      <Button variant="contained">Return to Home</Button>
    </div>
  );
};

export default EndGame;
