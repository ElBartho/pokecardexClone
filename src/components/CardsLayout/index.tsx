import { Box, Button, Input, Stack, TextField } from '@mui/material';
import CollapseCard from '../CollapseCard';
import { Serie } from '../../Types/Set';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import theme from '../../utils/style/theme';

const CardsLayout = ({
  seriesFormated,
  children,
}: {
  seriesFormated: Serie[];
  children: any;
}) => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchCard = (
      e.currentTarget.elements.namedItem('searchInput') as HTMLInputElement
    ).value;
    if (searchCard) {
      navigate(`/search/en?name=${searchCard}`);
    }
  };

  return (
    <Box>
      <Stack direction='row' gap={2}>
        <Box
          sx={{
            width: { xs: '0%', sm: '25%' },
            display: { xs: 'none', sm: 'block' },
            pl: 2,
            pr: 2,
            boxSizing: 'border-box',
          }}
        >
          <Stack direction='column' justifyContent='center'>
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
              <Button
                type='submit'
                variant='outlined'
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                  },
                  color: theme.palette.text.primary,
                  height: '48px',
                  minWidth: '48px',
                }}
              >
                <SearchOutlinedIcon />
              </Button>
              <TextField
                fullWidth
                variant='filled'
                color='primary'
                type='text'
                size='small'
                name='searchInput'
                placeholder='Search a card'
                margin='normal'
                // sx={{ height: '56px' }}
              />
            </Box>
            {seriesFormated.map((serieDetails, index) => (
              <CollapseCard key={index} serie={serieDetails} />
            ))}
          </Stack>
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '75%' }, pl: 2, pr: 2 }}>
          {children}
        </Box>
      </Stack>
    </Box>
  );
};

export default CardsLayout;
