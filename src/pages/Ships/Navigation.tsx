import { useParams } from 'react-router-dom';
import { useShipQuery, useWaypointsQuery } from '../../api/hooks';
import SystemMap from '../../components/SystemMap';
import WaypointNavigate from '../../components/WaypointNavigate';

export default function Navigation() {
  const { shipSymbol } = useParams();

  const shipQuery = useShipQuery(shipSymbol);
  const systemSymbol = shipQuery.data?.nav.systemSymbol;

  const systemWaypointsQuery = useWaypointsQuery(systemSymbol);

  return (
    <>
      <div className="flex h-full">
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              {shipQuery.data?.nav?.systemSymbol}
            </h5>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {shipQuery.isSuccess &&
              shipQuery.data &&
              systemWaypointsQuery.data?.data.map((waypoint) => {
                return (
                  <WaypointNavigate
                    key={waypoint.symbol}
                    shipSymbol={shipQuery.data ? shipQuery.data.symbol : ''}
                    waypoint={waypoint}
                    disabled={
                      waypoint.symbol === shipQuery.data?.nav.waypointSymbol
                    }
                  />
                );
              })}
          </ul>
        </div>
        <div className="w-full">
          <SystemMap
            waypoints={systemWaypointsQuery.data?.data || []}
            ship={shipQuery.data}
          />
        </div>
      </div>
    </>
  );
}
