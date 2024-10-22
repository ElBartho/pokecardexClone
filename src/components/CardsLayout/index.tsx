import { Box, IconButton, Stack, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import CollapseCard from '../CollapseCard';
import { Serie } from '../../Types/Set';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const CardsLayout = ({
  seriesFormated,
  children,
}: {
  seriesFormated: Serie[];
  children: any;
}) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchValue && searchValue.trim() !== '') {
      navigate(`/search/en?name=${searchValue}`);
      setSearchValue('');
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
              <TextField
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder='Search a card'
                variant='outlined'
                fullWidth
                margin='normal'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <IconButton type='submit'>
                        <SearchOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    borderRadius: '10px',
                  },
                }}
                sx={{
                  mt: '0',
                  borderRadius: '10px',
                }}
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
