import { Grid, Box } from '@mui/material';
import BackCard from '../../assets/img/backCard.png';

const CardLoading = ({
  totalCards = 36,
}: {
  totalCards: number | undefined;
}) => {
  return (
    <Grid container rowSpacing={2} columnSpacing={3}>
      {Array.from({ length: totalCards }).map((_, index) => (
        <Grid
          key={index}
          item
          xs={6}
          sm={4}
          md={2}
          sx={{
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ boxSizing: 'border-box' }}>
            <img
              src={BackCard}
              alt='Card'
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
export default CardLoading;
