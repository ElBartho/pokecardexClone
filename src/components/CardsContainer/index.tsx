import { Grid, Box } from '@mui/material';
import { CardData, FilterArrayData } from '../../Types/Set';
import { useState } from 'react';
import CardModal from '../Modal';

interface CardsContainerProps {
  cards: CardData[];
  filters: FilterArrayData[];
}

const CardsContainer = ({ cards, filters }: CardsContainerProps) => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const openModal = (card: CardData) => {
    setSelectedCard(card);
  };
  const closeModal = () => {
    setSelectedCard(null);
  };
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={3}>
        {cards?.map((card, index) => (
          <Grid
            key={index}
            item
            xs={6}
            sm={4}
            md={2}
            sx={{
              boxSizing: 'border-box',
              display: filters.find((filter) => filter.name === card.rarity)
                ?.active
                ? 'block'
                : 'none',
            }}
          >
            <Box sx={{ boxSizing: 'border-box' }}>
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
    </>
  );
};

export default CardsContainer;
