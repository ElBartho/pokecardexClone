import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import ConcreteSeamless from '../../assets/img/concreteSeamless.png';
import HomeLogo from '../../assets/img/pokecardexLogo.png';
import CardsLayout from '../../components/CardsLayout';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CardData, Serie, SetData } from '../../Types/Set';
import { getAllSets, getCardsByName } from '../../Service/PokemontcgSDK';
import { parseAndFormatSets } from '../../utils/dataProcessing';
import { useMemo, useState } from 'react';
import CardModal from '../../components/Modal';
import theme from '../../utils/style/theme';

const SearchCards = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';

  const navigate = useNavigate();
  const {
    data: setsData,
    isLoading: setLoading,
    error: setError,
  } = useQuery<SetData[]>('allSets', getAllSets, {
    cacheTime: 1000 * 60 * 30,
  });
  const seriesFormated: Serie[] = useMemo(
    () => parseAndFormatSets(setsData),
    [setsData]
  );

  const {
    data: cards = [],
    isFetching,
    isLoading,
    error,
  } = useQuery<CardData[]>(
    ['searchCards', name],
    (): Promise<CardData[]> => getCardsByName(name),
    {
      keepPreviousData: true,
      enabled: !!name,
      cacheTime: 1000 * 60 * 30,
    }
  );

  const openModal = (card: CardData) => {
    setSelectedCard(card);
  };
  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <main
      style={{
        backgroundImage: `url(${ConcreteSeamless})`,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: 'auto',
      }}
    >
      <Box
        sx={{
          maxWidth: '1320px',
          width: '100%',
          mr: 'auto',
          ml: 'auto',
          boxSizing: 'border-box',
        }}
      >
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
          <CardsLayout seriesFormated={seriesFormated}>
            <Box position='relative'>
              {isFetching && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    bgcolor: 'rgba(255, 255, 255, 0.6)',
                    zIndex: 1,
                    borderRadius: '15px',
                    backdropFilter: 'blur(4px)',
                  }}
                ></Box>
              )}
              <Stack direction='column' gap={2}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.palette.primary.main,
                    padding: theme.spacing(3),
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <Stack direction='column' gap={1} alignItems='center'>
                    {isFetching ? (
                      <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                        Fetching cards...
                      </Typography>
                    ) : (
                      <>
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                          {cards.length} Cards Found
                        </Typography>
                        <Typography
                          variant='h6'
                          sx={{ opacity: 0.8, fontStyle: 'italic' }}
                        >
                          for "{name}"
                        </Typography>
                      </>
                    )}
                  </Stack>
                </Box>
                <Grid container rowSpacing={2} columnSpacing={3}>
                  {cards
                    ?.sort(
                      (a, b) =>
                        Date.parse(b.set.releaseDate) -
                        Date.parse(a.set.releaseDate)
                    )
                    .map((card, index) => (
                      <Grid
                        key={index}
                        item
                        xs={6}
                        sm={4}
                        md={2}
                        sx={{
                          boxSizing: 'border-box',
                          display: 'block',
                        }}
                      >
                        <Box
                          sx={{
                            boxSizing: 'border-box',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                          }}
                        >
                          <img
                            src={card.images.small}
                            alt='Card'
                            style={{ maxWidth: '100%', height: 'auto' }}
                            onClick={() => openModal(card)}
                          />
                        </Box>
                      </Grid>
                    ))}
                </Grid>
                {selectedCard && (
                  <CardModal
                    isOpen={!!selectedCard}
                    onClose={closeModal}
                    card={selectedCard}
                  />
                )}
              </Stack>
            </Box>
          </CardsLayout>
        </Stack>
      </Box>
    </main>
  );
};

export default SearchCards;
