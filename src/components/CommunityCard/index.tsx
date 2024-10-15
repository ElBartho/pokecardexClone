import { Card, CardContent, Button, Stack, Typography } from '@mui/material';
import newsImg from '../../assets/img/news.png';
import theme from '../../utils/style/theme';

interface CommunityCardProps {
  section: string;
  index: number;
}

const CommunityCard = ({ section, index }: CommunityCardProps) => {
  return (
    <Card
      key={index}
      sx={{
        width: '100%',
        borderRadius: '15px',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Stack direction='column' sx={{ gap: 3 }}>
          <Typography variant='h3'>{section}</Typography>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <Card
              key={index}
              sx={{
                width: '100%',
                backgroundColor: theme.palette.secondary.main,
              }}
            >
              <CardContent>
                <Stack
                  direction='row'
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                  }}
                >
                  <img
                    src={newsImg}
                    style={{
                      width: '150px',
                      height: '100px',
                      borderRadius: '15px',
                    }}
                    alt='alt img'
                  />
                  <p>Contenu de la card</p>
                </Stack>
              </CardContent>
            </Card>
          ))}
          <Button
            variant='outlined'
            sx={{
              borderRadius: '15px',
              width: '100%',
              textTransform: 'none',
              fontSize: 16,
            }}
          >
            More {section}...
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CommunityCard;
