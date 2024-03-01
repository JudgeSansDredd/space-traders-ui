import { Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Auth from '../pages/Auth';
import Contracts from '../pages/Contracts';
import Contract from '../pages/Contracts/Contract';
import Ships from '../pages/Ships';
import Cargo from '../pages/Ships/Cargo';
import Navigation from '../pages/Ships/Navigation';
import Ship from '../pages/Ships/Ship';

const routesFn = () => {
  return (
    <>
      <Route path="/" element={<MainLayout />}>
        <Route path="contracts" element={<Contracts />}>
          <Route path=":contractId" element={<Contract />} />
        </Route>
        <Route path="ships" element={<Ships />}>
          <Route path=":shipSymbol" element={<Ship />}>
            <Route path="cargo" element={<Cargo />} />
          </Route>
        </Route>
        <Route path="ships/:shipSymbol/nav" element={<Navigation />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
    </>
  );
};

export default routesFn;
