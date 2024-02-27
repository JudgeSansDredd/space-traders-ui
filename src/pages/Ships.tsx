import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router';
import { verifyToken } from '../api/agent';
import { getShips } from '../api/ship';
import HomeLoginError from '../components/HomeLoginError';
import ShipCard from '../components/ShipCard';

export default function Ship() {
  const agentQuery = useQuery({
    queryKey: ['agent'],
    queryFn: async () => {
      return verifyToken();
    },
    staleTime: 10 * 60 * 1000,
  });

  const shipQuery = useQuery({
    queryKey: ['ships'],
    queryFn: async () => {
      return getShips();
    },
    staleTime: 10 * 60 * 1000,
  });

  return (
    <>
      {agentQuery.isLoading && <div>Loading...</div>}
      {agentQuery.isError && <HomeLoginError />}
      <div className="flex overflow-y-auto space-x-2">
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Ships
            </h5>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {shipQuery.isSuccess &&
                shipQuery.data.map((ship) => {
                  return <ShipCard key={ship.symbol} ship={ship} />;
                })}
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
