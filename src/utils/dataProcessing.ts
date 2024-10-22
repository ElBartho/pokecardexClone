import { FilterArrayData, FilterName, Serie, SetData } from '../Types/Set';

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
  'Radiant Rare': 15,
  'Rare Shining': 16,
  'Rare Holo EX': 17,
  'Rare Rainbow': 18,
  'Amazing Rare': 19,
  'Shiny Rare': 20,
  'Shiny Ultra Rare': 21,
  'Illustration Rare': 21,
  'Special Illustration Rare': 22,
  'Trainer Gallery Rare Holo': 23,
  'Rare Secret': 24,
};

export const parseAndFormatSets = (setsData: SetData[] = []): Serie[] => {
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
  });
  return Array.from(seriesMap.values());
};

export const addUniqueFilter = (
  filters: FilterArrayData[],
  newFilter: FilterName
): FilterArrayData[] => {
  const exists = filters.some((filter) => filter.name === newFilter);

  if (!exists) {
    return [...filters, { name: newFilter, value: 0, active: true }];
  }
  return filters;
};

export const addFiltersValue = (
  rarities: FilterArrayData[]
): FilterArrayData[] => {
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
