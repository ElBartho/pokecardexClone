import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Typography,
  Collapse,
  Divider,
  Box,
} from '@mui/material';
import { Serie } from '../../Types/Set';
import { useState } from 'react';
import pokeballIcon from '../../assets/img/PokeballIcon.png';
import { useNavigate } from 'react-router-dom';

interface CollapseProps {
  serie: Serie;
}

const CollapseCard = ({ serie }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        mb: '10px',
        borderRadius: '10px',
        boxSizing: 'border-box',
        alignItems: 'center',
      }}
    >
      <CardHeader
        sx={{ flexDirection: 'row-reverse', cursor: 'pointer' }}
        onClick={() => setIsOpen((prev) => !prev)}
        action={
          <Stack direction='row' alignItems='center' gap={1}>
            <img
              style={{ width: '20px' }}
              src={pokeballIcon}
              alt='pokeball Icon'
            />
            <Typography
              variant='h6'
              color='#055EB0'
              sx={{ fontWeight: '500', textAlign: 'center', fontSize: '1rem' }}
            >
              {serie.name}
            </Typography>
          </Stack>
        }
      />
      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        <Divider />
        <CardContent sx={{ p: '16px !important', boxSizing: 'border-box' }}>
          {isOpen && (
            <Stack direction='column'>
              {serie.sets.map((set, index) => (
                <Stack
                  key={index}
                  direction='row'
                  gap={1}
                  alignItems='center'
                  onClick={() => navigate(`/series/${set.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      borderRadius: '50px',
                      backgroundColor: '#e8e8e8',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '30px',
                      height: '30px',
                    }}
                  >
                    <img
                      src={set.images.symbol}
                      alt='logo'
                      style={{ maxWidth: '20px' }}
                    />
                  </Box>
                  <Typography variant='body1' sx={{ fontWeight: '400' }}>
                    {set.name}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CollapseCard;
