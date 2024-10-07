import { Grid, Card, CardContent } from '@mui/material';

interface FilterProp {
  children: React.ReactNode;
}

const Filter = ({ children }: FilterProp) => {
  return (
    <Grid item sx={{}}>
      <Card
        sx={{
          display: 'flex',
          pl: 1,
          pr: 1,
          m: 0.5,
          backgroundColor: 'white',
          borderRadius: '100px',
          height: '35px',
          boxSizing: 'border-box',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
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
    </Grid>
  );
};

export default Filter;
