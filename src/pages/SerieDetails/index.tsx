import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import HomeLogo from '../../assets/img/pokecardexLogo.png';
import { useState } from 'react';
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

type UseStateHook<T> = [T, React.Dispatch<React.SetStateAction<T>>];

const SerieDetails = () => {
  const navigate = useNavigate();
  const [filters, setFilters]: UseStateHook<FilterArrayData[]> = useState<
    FilterArrayData[]
  >([]);
  console.log(filters);
  const { setId = '' } = useParams<{ setId: string }>();
  const {
    data: setsData,
    isLoading: setLoading,
    error: setError,
  } = useQuery<SetData[]>('allSets', getAllSets);
  const parseAndFormatSets = (setsData: SetData[] = []): Serie[] => {
    const seriesMap = new Map();

    setsData.forEach((set) => {
      const { series, releaseDate } = set;

      if (!seriesMap.has(series)) {
        seriesMap.set(series, {
          name: series,
          sets: [],
          date: releaseDate,
        });
      }

      const seriesData = seriesMap.get(series);
      seriesData.sets.push(set);

      if (Date.parse(releaseDate) < Date.parse(seriesData.date)) {
        seriesData.date = releaseDate;
      }
    });

    seriesMap.forEach((seriesData) => {
      seriesData.sets.sort(
        (a: SetData, b: SetData) =>
          Date.parse(b.releaseDate) - Date.parse(a.releaseDate)
      );
    });
    return Array.from(seriesMap.values()).sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
  };
  const seriesFormated: Serie[] = parseAndFormatSets(setsData);
  const filterValues: { [key in FilterName]: number } = {
    'All Filters': -1,
    Common: 1,
    Uncommon: 2,
    Rare: 3,
    'Rare Holo': 4,
    'Rare Ultra': 5,
    Promo: 6,
    'Double Rare': 7,
    'Ultra Rare': 8,
    'Hyper Rare': 9,
    'ACE SPEC Rare': 10,
    'Rare Holo V': 11,
    'Rare Holo GX': 12,
    'Rare Holo VMAX': 13,
    'Rare Holo VSTAR': 14,
    'Rare Shining': 15,
    'Rare Holo EX': 16,
    'Rare Rainbow': 17,
    'Amazing Rare': 18,
    'Shiny Rare': 19,
    'Shiny Ultra Rare': 20,
    'Illustration Rare': 21,
    'Special Illustration Rare': 22,
    'Trainer Gallery Rare Holo': 23,
    'Rare Secret': 24,
  };

  const addUniqueFilter = (
    filters: FilterArrayData[],
    newFilter: FilterName
  ): FilterArrayData[] => {
    const exists = filters.some((filter) => filter.name === newFilter);

    if (!exists) {
      return [...filters, { name: newFilter, value: 0, active: true }];
    }
    return filters;
  };

  const addFiltersValue = (rarities: FilterArrayData[]): FilterArrayData[] => {
    return rarities.map((filter) => {
      if (filter.name !== 'All Filters') {
        return {
          ...filter,
          value: filterValues[filter.name],
        };
      }
      return filter;
    });
  };

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
        console.log(rarities);
        setFilters(rarities);
      },
    }
  );

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
