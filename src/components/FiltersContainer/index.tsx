import {
  Common,
  Uncommon,
  Rare,
  Holo,
  Ultra,
  Secret,
  Promo,
  DoubleRare,
  IlluRare,
  UltraRare,
  IlluSpeRare,
  HyperRare,
  HighTechRare,
  RareChromaIllu,
  SpeChromaIllu,
} from '../../assets/img/Rarity';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { FilterArrayData, FilterName } from '../../Types/Set';
import { useCallback, useMemo } from 'react';
import React from 'react';

interface FilterCardProps {
  filter: FilterArrayData;
  onClick: (filterName: string) => void;
  children: React.ReactNode;
}

interface FiltersContainerProps {
  filters: FilterArrayData[];
  setFilters: React.Dispatch<React.SetStateAction<FilterArrayData[]>>;
}

const FilterCard = ({ filter, onClick, children }: FilterCardProps) => {
  return (
    <Card
      onClick={() => onClick(filter.name)}
      sx={{
        display: 'flex',
        pl: 1,
        pr: 1,
        m: 0.5,
        backgroundColor: filter.active ? 'white' : '#D4D4D4',
        borderRadius: '100px',
        height: '35px',
        boxSizing: 'border-box',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <CardContent
        sx={{
          p: '0 !important',
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};

const FiltersContainer = ({ filters, setFilters }: FiltersContainerProps) => {
  const rarityPool: { [key in FilterName]: string } = useMemo(
    () => ({
      'All Filters': '',
      Common: Common,
      Uncommon: Uncommon,
      Rare: Rare,
      'Rare Holo': Holo,
      'Double Rare': DoubleRare,
      'Illustration Rare': IlluRare,
      'Ultra Rare': UltraRare,
      'Special Illustration Rare': IlluSpeRare,
      'Trainer Gallery Rare Holo': IlluSpeRare,
      'Hyper Rare': HyperRare,
      'ACE SPEC Rare': HighTechRare,
      Promo: Promo,
      'Rare Holo VMAX': Ultra,
      'Rare Holo VSTAR': Ultra,
      'Rare Holo V': Ultra,
      'Rare Holo GX': Ultra,
      'Rare Ultra': Ultra,
      'Radiant Rare': Ultra,
      'Rare Shining': Ultra,
      'Rare Holo EX': Ultra,
      'Rare Rainbow': Secret,
      'Rare Secret': Secret,
      'Amazing Rare': Ultra,
      'Shiny Rare': RareChromaIllu,
      'Shiny Ultra Rare': SpeChromaIllu,
    }),
    []
  );

  const toggleFilter = useCallback((filterName: string) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.name === filterName
          ? { ...filter, active: !filter.active }
          : filter
      )
    );
  }, []);

  const changeAllFilter = useCallback((value: boolean) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => ({ ...filter, active: !value }))
    );
  }, []);

  return (
    filters && (
      <Grid
        container
        direction='row'
        sx={{
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Grid item sx={{}}>
          <Card
            onClick={() => changeAllFilter(filters[0].active)}
            sx={{
              display: 'flex',
              pl: 1,
              pr: 1,
              m: 0.5,
              backgroundColor: filters[0]?.active ? 'white' : '#D4D4D4',
              borderRadius: '100px',
              height: '35px',
              boxSizing: 'border-box',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <CardContent
              sx={{
                p: '0 !important',
              }}
            >
              <CheckCircleOutlineIcon />
            </CardContent>
          </Card>
        </Grid>
        {filters.slice(1).map((filter, index) => (
          <Grid item sx={{}} key={index}>
            <FilterCard filter={filter} onClick={toggleFilter}>
              <Stack
                direction='row'
                gap={1}
                sx={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={rarityPool[filter.name]}
                  alt='img'
                  style={{ height: '15px' }}
                />
                <Typography variant='body1'>{filter.name}</Typography>
              </Stack>
            </FilterCard>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default FiltersContainer;
