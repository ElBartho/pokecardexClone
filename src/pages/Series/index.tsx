import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import HomeLogo from '../../assets/img/pokecardexLogo.png';
import pokeballIcon from '../../assets/img/PokeballIcon.png';
import { useNavigate } from 'react-router-dom';
import { SetData, Serie } from '../../Types/Set';
import { useQuery } from 'react-query';
import { getAllSets } from '../../Service/PokemontcgSDK';
import { parseAndFormatSets } from '../../utils/dataProcessing';

const Series = () => {
  const navigate = useNavigate();
  const {
    data: setsData,
    isLoading: setLoading,
    error: setError,
  } = useQuery<SetData[]>('allSets', getAllSets, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
  const seriesFormated: Serie[] = parseAndFormatSets(setsData);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: 'auto',
      }}
    >
      <Box sx={{ maxWidth: '1320px', width: '100%', mr: 'auto', ml: 'auto' }}>
        <Stack direction='column' sx={{ width: '100%', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 2, md: 4 },
            }}
          >
            <img
              onClick={() => navigate('/')}
              src={HomeLogo}
              alt='Pokecardex Logo'
              style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
            />
          </Box>
          {seriesFormated.length > 0 ? (
            <Stack className='mainStack' direction='column' sx={{ gap: 2 }}>
              {seriesFormated.map((serieDetails) => (
                <Card key={serieDetails.name} sx={{ borderRadius: '15px' }}>
                  <CardContent>
                    <Stack direction='column' sx={{ gap: 2 }}>
                      <Stack direction='row' alignItems='center' gap={2}>
                        <img
                          style={{ width: '48px' }}
                          src={pokeballIcon}
                          alt='pokeball Icon'
                        />
                        <Typography
                          variant='h4'
                          color='#055EB0'
                          sx={{ fontWeight: 'bold' }}
                        >
                          {serieDetails.name}
                        </Typography>
                      </Stack>
                      <Grid container rowSpacing={2} columnSpacing={3} gap={0}>
                        {serieDetails.sets.map((set: SetData) => (
                          <Grid key={set.name} item xs={3}>
                            <Card
                              onClick={() => navigate(`/series/${set.id}`)}
                              sx={{
                                borderRadius: '15px',
                                backgroundColor: '#EFEFEF',
                                cursor: 'pointer',
                              }}
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
                                      flexGrow: 1,
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
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <p>chargement...</p>
          )}
        </Stack>
      </Box>
    </main>
  );
};

export default Series;
