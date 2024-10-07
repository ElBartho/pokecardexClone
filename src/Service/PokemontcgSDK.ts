import axios, { AxiosError } from 'axios';
import { SetData, CardData } from '../Types/Set';

const apiClient = axios.create({
  baseURL: 'https://api.pokemontcg.io/v2',
  headers: {
    'X-Api-Key': 'c5441acc-578f-4340-9cda-2f707d104415',
  },
});

const fetchFromApi = async (endpoint: string) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`API Error: ${error.response?.status} - ${error.message}`);
      throw new Error(error.response?.data?.message || 'API call error');
    }
    throw error;
  }
};

// Call API for Sets:

export const getAllSets = async (): Promise<SetData[]> => {
  const data = await fetchFromApi('/sets');
  return data?.data ?? [];
};

export const getSetBySeries = async (serie: string): Promise<SetData[]> => {
  const data = await fetchFromApi(`/sets?q=series:${serie}`);
  return data?.data ?? [];
};

export const getSet = async (setId: string): Promise<SetData> => {
  const data = await fetchFromApi(`/sets/${setId}`);
  return data?.data ?? [];
};

// Call API for Cards

export const getSetCards = async (setId: string): Promise<CardData[]> => {
  const data = await fetchFromApi(`/cards?q=set.id:${setId}`);
  return data?.data ?? [];
};