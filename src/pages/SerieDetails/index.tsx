import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import HomeLogo from '../../assets/img/pokecardexLogo.png';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllSets, getSetCards } from '../../Service/PokemontcgSDK';
import {
  Serie,
  CardData,
  SetData,
  FilterName,
  FilterArrayData,
} from '../../Types/Set';
import CardsContainer from '../../components/CardsContainer';
import CollapseCard from '../../components/CollapseCard';
import Banner from '../../components/Banner';
import FiltersContainer from '../../components/FiltersContainer';
import { useQuery } from 'react-query';
import {
  addFiltersValue,
  addUniqueFilter,
  parseAndFormatSets,
} from '../../utils/dataProcessing';

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
  } = useQuery<SetData[]>('allSets', getAllSets);
  const seriesFormated: Serie[] = useMemo(
    () => parseAndFormatSets(setsData),
    [setsData]
  );

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
      onSuccess: (data) => {
        let rarities: FilterArrayData[] = [
          { name: 'All Filters', value: -1, active: true },
        ];
        data.forEach((card) => {
          rarities = addUniqueFilter(rarities, card.rarity);
        });
        rarities = addFiltersValue(rarities).sort((a, b) => a.value - b.value);
        setFilters(rarities);
      },
    }
  );
  // const rarities = useMemo(() => {
  //   if (!cards) return [];
  //   let rarities: FilterArrayData[] = [
  //     { name: 'All Filters', value: -1, active: true },
  //   ];
  //   cards.forEach((card) => {
  //     rarities = addUniqueFilter(rarities, card.rarity);
  //   });
  //   return addFiltersValue(rarities).sort((a, b) => a.value - b.value);
  // }, [cards]);

  // useEffect(() => {
  //   if (rarities.length > 0) {
  //     setFilters(rarities);
  //   }
  // }, [rarities]);

  return (
    <main
      style={{
        backgroundColor: '#EFEFEF',
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
                  {seriesFormated.map((serieDetails, index) => (
                    <CollapseCard key={index} serie={serieDetails} />
                  ))}
                </Stack>
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '75%' }, pl: 2, pr: 2 }}>
                <Stack direction='column' gap={3}>
                  {isLoading ? (
                    <p>Loading....</p>
                  ) : error ? (
                    <p>An error as occured, please try again later.</p>
                  ) : (
                    <>
                      <Banner card={cards[0]} />
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
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </main>
  );
};

export default SerieDetails;
