import { Route } from 'react-router-dom';
import App from '../App';
import MainLayout from '../layout/MainLayout';

const routesFn = () => {
  return (
    <>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<App />} />
      </Route>
    </>
  );
};

export default routesFn;
