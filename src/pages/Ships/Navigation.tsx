import { useParams } from 'react-router-dom';
import { useShipQuery, useWaypointsQuery } from '../../api/hooks';
import ButtonLink from '../../components/ButtonLink';
import SystemMap from '../../components/SystemMap';
import WaypointNavigate from '../../components/WaypointNavigate';

export default function Navigation() {
  const { shipSymbol } = useParams();

  const shipQuery = useShipQuery(shipSymbol);
  const systemSymbol = shipQuery.data?.nav.systemSymbol;

  const systemWaypointsQuery = useWaypointsQuery(systemSymbol);

  return (
    <>
      <div className="flex">
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
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
            <li className="flex justify-between items-center py-3 sm:py-4 px-2">
              <div>{`Location: ${shipQuery.data?.nav.waypointSymbol}`}</div>
              <ButtonLink to={`/ships/${shipSymbol}/nav`}>View Nav</ButtonLink>
            </li>
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
