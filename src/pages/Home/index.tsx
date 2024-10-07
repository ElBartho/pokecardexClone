import React, { useState } from 'react';
import HomeLogo from '../../assets/img/pokecardexLogo.png';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import newsImg from '../../assets/img/news.png';
import { useNavigate } from 'react-router-dom';
import { SetData } from '../../Types/Set';
import { useQuery } from 'react-query';
import { getAllSets } from '../../Service/PokemontcgSDK';

type buttons = {
  name: string;
  to: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

const Home = () => {
  const navigate = useNavigate();
  const buttons: buttons[] = [
    {
      name: 'Forums',
      to: '/forums',
      startIcon: <TextsmsOutlinedIcon />,
    },
    {
      name: 'Collections',
      to: '/collections',
      startIcon: <LibraryBooksOutlinedIcon />,
    },
    {
      name: 'Trade',
      to: '/trade',
      startIcon: <CachedOutlinedIcon />,
    },
    {
      name: 'Articles',
      to: '/articles',
      startIcon: <FolderOpenOutlinedIcon />,
    },
  ];

  const community = ['News', 'Articles'];
  const cardSets = ['International sets', 'Japanese sets'];
  const [series, setSeries] = useState<SetData[]>([]);

  const {
    data: setData,
    isLoading,
    error,
  } = useQuery('allSets', getAllSets, {
    onSuccess: (setData) => {
      setSeries(setData);
    },
  });

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: 'auto',
        backgroundColor: '#EFEFEF',
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
          <Stack
            direction='row'
            sx={{
              width: '100%',
              justifyContent: 'center',
              gap: 3,
              margin: 'auto',
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant='outlined'
                size='large'
                startIcon={button.startIcon}
                sx={{
                  width: '100%',
                  borderRadius: '15px',
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                }}
              >
                {button.name}
              </Button>
            ))}
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ width: '100%', gap: 3 }}
          >
            <Stack direction='column' sx={{ width: '100%', gap: 2 }}>
              {community.map((section, index) => (
                <Card key={index} sx={{ width: '100%', borderRadius: '15px' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Stack direction='column' sx={{ gap: 3 }}>
                      <Typography variant='h3'>{section}</Typography>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <Card key={index} sx={{ width: '100%' }}>
                          <CardContent>
                            <Stack
                              direction='row'
                              sx={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 3,
                              }}
                            >
                              <img
                                src={newsImg}
                                style={{
                                  width: '150px',
                                  height: '100px',
                                  borderRadius: '15px',
                                }}
                                alt='alt img'
                              />
                              <p>Contenu de la card</p>
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                      <Button
                        variant='outlined'
                        sx={{
                          borderRadius: '15px',
                          width: '100%',
                          textTransform: 'none',
                          fontSize: 16,
                        }}
                      >
                        More {section}...
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
            <Stack
              direction='column'
              sx={{ width: '100%', gap: 2, textAlign: 'center' }}
            >
              {cardSets.map((section, index) => (
                <Card
                  key={index}
                  className='Card'
                  sx={{
                    width: '100%',
                    borderRadius: '15px',
                  }}
                >
                  <CardContent>
                    <Stack
                      direction='column'
                      gap={3}
                      sx={{ borderRadius: '10px' }}
                    >
                      <Typography variant='h3' sx={{ fontWeight: '500' }}>
                        {section}
                      </Typography>
                      {series ? (
                        <Grid container rowSpacing={2} columnSpacing={3}>
                          {series
                            .sort(
                              (a, b) =>
                                Date.parse(b.releaseDate) -
                                Date.parse(a.releaseDate)
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
                        All internationnal sets
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </main>
  );
};

export default Home;
