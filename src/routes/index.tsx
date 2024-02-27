import { Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Auth from '../pages/Auth';
import Contracts from '../pages/Contracts';
import Ship from '../pages/Ship';
import Cargo from '../pages/Ship/Cargo';
import Navigation from '../pages/Ship/Navigation';
import Ships from '../pages/Ships';

const routesFn = () => {
  return (
    <>
      <Route path="/" element={<MainLayout />}>
        <Route path="contracts" element={<Contracts />} />
        <Route path="ships" element={<Ships />}>
          <Route path=":shipSymbol" element={<Ship />}>
            <Route path="nav" element={<Navigation />} />
            <Route path="cargo" element={<Cargo />} />
          </Route>
          R
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Route>
    </>
  );
};

export default routesFn;
