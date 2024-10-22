import { Card, CardContent, Button, Stack, Typography } from '@mui/material';
import newsImg from '../../assets/img/news.png';
import theme from '../../utils/style/theme';
import { CommunityCardProps } from '../../Types/Set/index';

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
      <CardContent>
        <Stack direction='column' sx={{ gap: 3 }}>
          <Typography variant='h3' sx={{ textAlign: 'center' }}>
            {section.title}
          </Typography>
          {section.data.slice(0, 8).map((item, index) => (
            <Card
              key={index}
              sx={{
                width: '100%',
                maxHeight: '100px',
                borderRadius: '15px',
                backgroundColor: theme.palette.secondary.main,
              }}
            >
              <CardContent
                sx={{
                  p: '0 !important',
                }}
              >
                <Stack
                  direction='row'
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 2,
                  }}
                >
                  <img
                    src={item.image_url}
                    style={{
                      width: '150px',
                      height: '100px',
                      borderRadius: '15px',
                    }}
                    alt='alt img'
                  />
                  <Stack direction='column' gap={2} alignItems='flex-start'>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant='subtitle1'>
                      By {item.author}, on {item.date}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
          <Button
            variant='outlined'
            sx={{
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: '15px',
              width: '100%',
              textTransform: 'none',
              fontSize: 16,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            More {section.title.toLowerCase()}...
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CommunityCard;
