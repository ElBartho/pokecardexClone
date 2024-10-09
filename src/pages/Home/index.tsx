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
import { useNavigate } from 'react-router-dom';
import { buttons, SetData } from '../../Types/Set';
import { useQuery } from 'react-query';
import { getAllSets } from '../../Service/PokemontcgSDK';
import CommunityCard from '../../components/CommunityCard';
import HomeSetsCard from '../../components/HomeSetsCard';

const homeButtons: buttons[] = [
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

const Home = () => {
  const navigate = useNavigate();

  const {
    data: series,
    isLoading: setLoading,
    error: setError,
  } = useQuery<SetData[]>('allSets', getAllSets, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
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
            {homeButtons.map((button, index) => (
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
                <CommunityCard key={index} index={index} section={section} />
              ))}
            </Stack>
            <Stack
              direction='column'
              sx={{ width: '100%', gap: 2, textAlign: 'center' }}
            >
              {cardSets.map((section, index) => (
                <HomeSetsCard
                  key={index}
                  index={index}
                  section={section}
                  series={series ? series : []}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </main>
  );
};

export default Home;
