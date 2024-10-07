import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
// import FrenchFlag from '../../assets/img/FrenchFlag.png';
import FrenchFlag from '../../assets/img/FrenchFlag.png';
import { CardData } from '../../Types/Set';

interface BannerProps {
  card: CardData;
}

const Banner = ({ card }: BannerProps) => {
  return (
    <Box>
      {card && (
        <Card
          sx={{
            borderRadius: '10px',
            boxSizing: 'border-box',
          }}
        >
          <CardContent
            sx={{
              p: '1rem !important',
            }}
          >
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='center'
              sx={{ width: '100%' }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  width: '100%',
                  p: 2,
                  boxSizing: 'border-box',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={card?.set.images.logo}
                  alt='img set'
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: '120px',
                  }}
                />
              </Box>
              <Stack
                direction='column'
                alignItems='center'
                gap={3}
                sx={{ width: '100%' }}
              >
                <Typography variant='h5' sx={{ fontWeight: '500' }}>
                  {card?.set.name}
                </Typography>
                <Stack direction='column' alignItems='flex-start'>
                  <Stack direction='row' alignItems='center' gap={1}>
                    <img src={FrenchFlag} alt='' style={{ width: '25px' }} />
                    <Typography>{card?.set.releaseDate}</Typography>
                  </Stack>
                  <Stack direction='row' alignItems='center' gap={1}>
                    <img
                      src={card?.set.images.symbol}
                      alt=''
                      style={{ width: '25px', height: 'auto' }}
                    />
                    <Typography>{card?.set.total} cards</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Banner;
