// Types And Interfaces for Buttons

export type buttons = {
  name: string;
  to: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

// Types And Interfaces for Sets

interface Legalities {
  expanded: string;
  standard: string;
  unlimited: string;
}

interface Images {
  symbol: string;
  logo: string;
}

export interface SetData {
  id: string;
  name: string;
  series: string;
  printedToatal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: Images;
}

export interface Serie {
  name: string;
  date: string;
  sets: SetData[];
}

// Types And Interfaces for Filters

export type FilterName =
  | 'All Filters'
  | 'Common'
  | 'Uncommon'
  | 'Rare'
  | 'Rare Holo'
  | 'Double Rare'
  | 'Illustration Rare'
  | 'Ultra Rare'
  | 'Special Illustration Rare'
  | 'Hyper Rare'
  | 'ACE SPEC Rare'
  | 'Promo'
  | 'Rare Holo VMAX'
  | 'Rare Holo V'
  | 'Rare Holo GX'
  | 'Rare Ultra'
  | 'Rare Shining'
  | 'Rare Holo EX'
  | 'Rare Rainbow'
  | 'Rare Secret'
  | 'Amazing Rare'
  | 'Shiny Rare'
  | 'Shiny Ultra Rare'
  | 'Rare Holo VSTAR'
  | 'Trainer Gallery Rare Holo';

export interface FilterArrayData {
  name: FilterName;
  value: number;
  active: boolean;
}

// Types And Interfaces for Cards

type AncientTrait = {
  name: string;
  text: string;
};

type Abilities = {
  name: string;
  text: string;
  Type: string;
};

type Attacks = {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
};

type Weaknesses = {
  type: string;
  value: string;
};

type Resistances = {
  type: string;
  value: string;
};

type PricesType = {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
};

type Prices = {
  normal?: PricesType;
  holofoil?: PricesType;
  reverseHolofoil?: PricesType;
  '1stEditionHolofoil'?: PricesType;
  '1stEditionNormal'?: PricesType;
};

type CardImages = {
  small: string;
  large: string;
};

type TcgPlayer = {
  url: string;
  updatedAt: string;
  prices: Prices;
};

type CardMarketPrices = {
  averageSellPrice: number;
  lowPrice: number;
  trendPrice: number;
  germanProLow: number;
  suggestedPrice: number;
  reverseHoloSell: number;
  reverseHoloLow: number;
  reverseHoloTrend: number;
  lowPriceExPlus: number;
  avg1: number;
  avg7: number;
  avg30: number;
  reverseHoloAvg1: number;
  reverseHoloAvg7: number;
  reverseHoloAvg30: number;
};

type CardMarket = {
  url: string;
  updatedAt: string;
  prices: CardMarketPrices;
};

export interface CardData {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  level?: string;
  hp: string;
  types: string;
  evolvesFrom?: string[];
  evolvesTo?: string[];
  rules: string[];
  ancientTrait?: AncientTrait;
  abilities: Abilities[];
  attacks: Attacks[];
  weaknesses: Weaknesses[];
  resistances: Resistances[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: SetData;
  number: string;
  artist: string;
  rarity: FilterName;
  flavorText?: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  regulationMark?: string;
  images: CardImages;
  tcgplayer?: TcgPlayer;
  cardmarket?: CardMarket;
}
