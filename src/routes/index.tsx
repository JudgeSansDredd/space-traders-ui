import { Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import Start from '../pages/Start';

const routesFn = () => {
  return (
    <>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Start />} />
      </Route>
    </>
  );
};

export default routesFn;
