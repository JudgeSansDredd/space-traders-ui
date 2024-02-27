import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getShip } from '../../api/ship';

export default function Cargo() {
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
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              {shipQuery.data.symbol}
            </h5>
          </div>
          <div className="flow-root">
            {shipQuery.data.cargo.inventory.length === 0 && (
              <div>No cargo in hold.</div>
            )}
            {shipQuery.data.cargo.inventory.length > 0 && (
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {shipQuery.data.cargo.inventory.map((item) => {
                  return (
                    <div role="listitem">
                      <strong>{item.good}: </strong> {item.quantity}
                    </div>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
