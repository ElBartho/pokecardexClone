import React, { useState } from 'react';
import HomeLogo from '../../assets/img/pokecardexLogo.png';
import { Box, Button, Stack, TextField } from '@mui/material';
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
import theme from '../../utils/style/theme';
import ConcreteSeamless from '../../assets/img/concreteSeamless.png';
import news from '../../utils/news.json';
import articles from '../../utils/articles.json';
import { CommunityData } from '../../Types/Set';

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

const community: CommunityData[] = [
  { title: 'News', data: news },
  { title: 'Articles', data: articles },
];
const cardSets: string[] = ['International', 'Japanese'];

const Home = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const {
    data: series,
    isLoading: setLoading,
    error: setError,
  } = useQuery<SetData[]>('allSets', getAllSets, {
    cacheTime: 1000 * 60 * 30,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchValue && searchValue.trim() !== '') {
      navigate(`/search/en?name=${searchValue}`);
      setSearchValue('');
    }
  };

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: 'auto',
        backgroundImage: `url(${ConcreteSeamless})`,
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
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                {button.name}
              </Button>
            ))}
          </Stack>
          <Box
            component='form'
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            <TextField
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search a card'
              variant='outlined'
              fullWidth
              margin='normal'
              InputProps={{
                style: {
                  borderRadius: '15px',
                },
              }}
              sx={{
                mt: '0',
                borderRadius: '15px',
                input: {
                  textAlign: 'center',
                },
              }}
            />
          </Box>
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
                  series={series ? series.slice(0, 12) : []}
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
