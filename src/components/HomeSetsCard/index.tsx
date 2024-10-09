import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { SetData } from '../../Types/Set';
import { useNavigate } from 'react-router-dom';

interface HomeSetsCardProps {
  section: string;
  series: SetData[];
  index: number;
}

const HomeSetsCard = ({ section, series, index }: HomeSetsCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      key={index}
      className='Card'
      sx={{
        width: '100%',
        borderRadius: '15px',
      }}
    >
      <CardContent>
        <Stack direction='column' gap={3} sx={{ borderRadius: '10px' }}>
          <Typography variant='h3' sx={{ fontWeight: '500' }}>
            {section}
          </Typography>
          {series ? (
            <Grid container rowSpacing={2} columnSpacing={3}>
              {series
                .sort(
                  (a, b) =>
                    Date.parse(b.releaseDate) - Date.parse(a.releaseDate)
                )
                .slice(0, 12)
                .map((set, index) => (
                  <Grid key={index} item xs={12} md={6}>
                    <Card
                      sx={{
                        borderRadius: '15px',
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate(`/series/${set.id}`)}
                    >
                      <CardContent
                        sx={{
                          p: '0 !important',
                        }}
                      >
                        <Stack
                          direction='row'
                          alignItems='center'
                          justifyContent='center'
                          sx={{ width: '100%', height: '100px' }}
                        >
                          <Box
                            sx={{
                              ml: 3,
                            }}
                          >
                            <img
                              src={set.images.symbol}
                              alt='symbol'
                              style={{ maxHeight: '30px' }}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: '100%',
                              p: 2,
                              boxSizing: 'border-box',
                            }}
                          >
                            <img
                              src={set.images.logo}
                              alt='img set'
                              style={{
                                maxWidth: '100%',
                                height: 'auto',
                                maxHeight: '90px',
                              }}
                            />
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          ) : (
            <p>chargement...</p>
          )}
          <Button
            variant='outlined'
            onClick={() => navigate('/series')}
            sx={{
              borderRadius: '15px',
              width: '100%',
              textTransform: 'none',
              fontSize: 16,
            }}
          >
            All international sets
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default HomeSetsCard;
