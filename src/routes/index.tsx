import { Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Auth from '../pages/Auth';
import Home from '../pages/Home';

const routesFn = () => {
  return (
    <>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
    </>
  );
};

export default routesFn;
