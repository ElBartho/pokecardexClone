import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { CardData } from '../../Types/Set';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: CardData;
}

const CardModal = ({ isOpen, onClose, card }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!isZoomed) {
      const imgElement = imgRef.current;
      if (imgElement) {
        const rect = imgElement.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * 30;
        const rotateY = (x - 0.5) * -30;
        setRotation({ x: rotateX, y: rotateY });
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isZoomed) {
      setRotation({ x: 0, y: 0 });
    }
  };

  const toggleZoom = () => {
    setIsZoomed((prevZoom) => !prevZoom);
    if (!isZoomed) {
      setRotation({ x: 0, y: 0 });
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Box
      ref={modalRef}
      onClick={handleOverlayClick}
      aria-modal='true'
      role='dialog'
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.2s',
          maxWidth: { xs: '90%', md: '800px' },
          width: '100%',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <img
          ref={imgRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={toggleZoom}
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: isZoomed ? '540px' : '270px',
            maxHeight: isZoomed ? '750px' : '375px',
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition:
              'transform 0.1s ease, width 0.3s ease, height 0.3s ease',
            cursor: 'pointer',
            borderRadius: isZoomed ? '25px' : '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          }}
          src={card.images.large}
          alt={card.name}
        />
        <CardContent
          sx={{
            flex: 1,
            paddingLeft: { xs: 0, md: '16px' },
            paddingTop: { xs: '16px', md: 0 },
          }}
        >
          <Typography
            variant='h4'
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#3f51b5' }}
          >
            {card.name}
          </Typography>
          {card.hp && (
            <Typography variant='h6' color='text.secondary' gutterBottom>
              HP: {card.hp}
            </Typography>
          )}
          {card.evolvesTo && card.evolvesTo.length > 0 && (
            <Typography variant='body1' gutterBottom>
              Evolves to: <strong>{card.evolvesTo.join(', ')}</strong>
            </Typography>
          )}
          {card.attacks && (
            <Box mt={2}>
              <Typography variant='h6' gutterBottom>
                Attacks:
              </Typography>
              {card.attacks.map((attack, index) => (
                <Box key={index} mb={2}>
                  <Typography variant='subtitle1'>
                    <strong>{attack.name}</strong>
                  </Typography>
                  <Typography variant='body2'>
                    Cost: <strong>{attack.cost.join(', ')}</strong> | Damage:{' '}
                    <strong>{attack.damage}</strong>
                  </Typography>
                  <Typography variant='body2'>{attack.text}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>,
    document.body
  );
};

export default CardModal;
