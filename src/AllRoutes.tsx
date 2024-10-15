import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Series from './pages/Series';
import SeriesDetails from './pages/SerieDetails';
import Error from './pages/Error';
import Forums from './pages/Forums';
import Trade from './pages/Trade';
import Articles from './pages/Articles';
import SearchCards from './pages/SearchCards';

const AllRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/forums' element={<Forums />} />
      <Route path='/series' element={<Series />} />
      <Route path='/series/:setId' element={<SeriesDetails />} />
      <Route path='/search/en' element={<SearchCards />} />
      <Route path='/trades' element={<Trade />} />
      <Route path='/articles' element={<Articles />} />
      {/* <Route path='/login' element={<Login />} /> */}
      <Route path='*' element={<Error />} />
    </Routes>
  );
};

export default AllRoutes;
