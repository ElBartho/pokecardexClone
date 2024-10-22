import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import FrenchFlag from '../../assets/img/FrenchFlag.png';
import { SetData } from '../../Types/Set';
import theme from '../../utils/style/theme';

interface BannerProps {
  set: SetData | null;
}

const Banner = ({ set }: BannerProps) => {
  return (
    <Box>
      {set && (
        <Card
          sx={{
            borderRadius: '10px',
            backgroundColor: theme.palette.primary.main,
            boxShadow: '0 4px 16px 4px rgba(0,0,0,0.2)',
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
                  src={set.images.logo}
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
                  {set.name}
                </Typography>
                <Stack direction='column' alignItems='flex-start'>
                  <Stack direction='row' alignItems='center' gap={1}>
                    <img src={FrenchFlag} alt='' style={{ width: '25px' }} />
                    <Typography>{set.releaseDate}</Typography>
                  </Stack>
                  <Stack direction='row' alignItems='center' gap={1}>
                    <img
                      src={set.images.symbol}
                      alt=''
                      style={{ width: '25px', height: 'auto' }}
                    />
                    <Typography>{set.total} cards</Typography>
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
