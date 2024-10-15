import { Box, Grid, Stack } from '@mui/material';
import HomeLogo from '../../assets/img/pokecardexLogo.png';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllSets, getSetCards } from '../../Service/PokemontcgSDK';
import { Serie, CardData, SetData, FilterArrayData } from '../../Types/Set';
import CardsContainer from '../../components/CardsContainer';
import Banner from '../../components/Banner';
import FiltersContainer from '../../components/FiltersContainer';
import CardsLayout from '../../components/CardsLayout';
import { useQuery } from 'react-query';
import CardLoading from '../../components/CardsLoading';
import {
  addFiltersValue,
  addUniqueFilter,
  parseAndFormatSets,
} from '../../utils/dataProcessing';
import ConcreteSeamless from '../../assets/img/concreteSeamless.png';

type UseStateHook<T> = [T, React.Dispatch<React.SetStateAction<T>>];

const SerieDetails = () => {
  const navigate = useNavigate();
  const [filters, setFilters]: UseStateHook<FilterArrayData[]> = useState<
    FilterArrayData[]
  >([]);
  const { setId = '' } = useParams<{ setId: string }>();
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
  const set: SetData | null = useMemo(() => {
    for (const serie of setsData || []) {
      if (serie.id === setId) {
        console.log('trigger');
        return serie;
      }
    }
    return null;
  }, [setsData, setId]);

  const {
    data: cards = [],
    isLoading,
    error,
  } = useQuery<CardData[]>(
    ['allCards', setId],
    (): Promise<CardData[]> => getSetCards(setId),
    {
      keepPreviousData: true,
      enabled: !!setId,
      cacheTime: 1000 * 60 * 30,
    }
  );

  const rarities = useMemo(() => {
    let tmpRarities: FilterArrayData[] = [
      { name: 'All Filters', value: -1, active: true },
    ];
    cards.forEach((card) => {
      tmpRarities = addUniqueFilter(tmpRarities, card.rarity);
    });
    tmpRarities = addFiltersValue(tmpRarities).sort(
      (a, b) => a.value - b.value
    );

    return tmpRarities;
  }, [cards]);

  useEffect(() => {
    setFilters(rarities);
  }, [rarities]);

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
            <Stack direction='column' gap={3}>
              <Banner set={set} />
              {isLoading ? (
                <CardLoading totalCards={set?.total} />
              ) : error ? (
                <p>An error as occured, please try again later.</p>
              ) : (
                <>
                  <Box>
                    <FiltersContainer
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </Box>
                  <Box>
                    <CardsContainer cards={cards} filters={filters} />
                  </Box>
                </>
              )}
            </Stack>
          </CardsLayout>
        </Stack>
      </Box>
    </main>
  );
};

export default SerieDetails;
