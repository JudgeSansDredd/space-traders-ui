import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto h-full">
        <Outlet />
      </div>
    </>
  );
}
