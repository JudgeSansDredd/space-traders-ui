import { useQuery } from '@tanstack/react-query';
import { Outlet, useParams } from 'react-router-dom';
import { getShip } from '../../api/ship';
import ButtonLink from '../../components/ButtonLink';

export default function Ship() {
  const { shipSymbol } = useParams();

  const shipQuery = useQuery({
    queryKey: ['ship', shipSymbol],
    queryFn: async () => {
      return getShip(shipSymbol || '');
    },
    staleTime: 10 * 60 * 1000,
  });

  return (
    <>
      {shipQuery.isLoading && <div>Loading...</div>}
      {shipQuery.isSuccess && (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              {shipQuery.data.symbol}
            </h5>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="flex justify-between items-center py-3 sm:py-4 px-2">
              <div>
                {`Cargo: ${shipQuery.data.cargo.units} / ${shipQuery.data.cargo.capacity}`}
              </div>
              <ButtonLink to={`/ships/${shipSymbol}/cargo`}>
                View Cargo
              </ButtonLink>
            </li>
            <li className="flex justify-between items-center py-3 sm:py-4 px-2">
              <div>{`Location: ${shipQuery.data.nav.waypointSymbol}`}</div>
              <ButtonLink to={`/ships/${shipSymbol}/nav`}>View Nav</ButtonLink>
            </li>
          </ul>
        </div>
      )}
      <Outlet />
    </>
  );
}
