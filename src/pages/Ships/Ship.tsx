import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useShipQuery, useWaypointsQuery } from '../../api/hooks';
import { refuel } from '../../api/ship';
import { dock, orbit } from '../../api/ship/navigate';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import { makeHumanReadable } from '../../utils';

export default function Ship() {
  const { shipSymbol } = useParams();
  const queryClient = useQueryClient();

  const shipQuery = useShipQuery(shipSymbol);
  const waypointQuery = useWaypointsQuery(shipQuery.data?.nav.systemSymbol);

  const waypoint = waypointQuery.data?.data.find(
    (waypoint) => waypoint.symbol === shipQuery.data?.nav.waypointSymbol
  );

  const dockMutation = useMutation({
    mutationKey: ['docking', shipSymbol],
    mutationFn: (action: 'orbit' | 'dock') => {
      return action === 'orbit'
        ? orbit(shipSymbol || '')
        : dock(shipSymbol || '');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ships'] });
    },
  });

  const refuelMutation = useMutation({
    mutationKey: ['refuel', shipSymbol],
    mutationFn: () => {
      return refuel(shipSymbol || '');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ships'] });
      queryClient.invalidateQueries({ queryKey: ['verify'] });
    },
  });

  const handleDockClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dockMutation.mutate('dock');
  };

  const handleOrbitClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dockMutation.mutate('orbit');
  };

  const handleRefuelClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    refuelMutation.mutate();
  };

  return (
    <>
      {shipQuery.isLoading && <div>Loading...</div>}
      {shipQuery.isSuccess && (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              {shipQuery.data?.symbol}
            </h5>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Status: {makeHumanReadable(shipQuery.data?.nav.status ?? '')}
            </p>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="flex justify-between items-center py-3 sm:py-4 px-2">
              <div>
                {`Cargo: ${shipQuery.data?.cargo.units} / ${shipQuery.data?.cargo.capacity}`}
              </div>
              <ButtonLink to={`/ships/${shipSymbol}/cargo`}>
                View Cargo
              </ButtonLink>
            </li>
            <li className="flex justify-between items-center py-3 sm:py-4 px-2">
              <div>
                <div>{`Location: ${shipQuery.data?.nav.waypointSymbol}`}</div>
                {waypoint?.traits.map((trait) => {
                  return (
                    <p
                      key={trait.symbol}
                      className="text-sm text-gray-500 truncate dark:text-gray-400"
                      title={trait.description}
                    >
                      {trait.name}
                    </p>
                  );
                })}
              </div>
              <ButtonLink to={`/ships/${shipSymbol}/nav`}>View Nav</ButtonLink>
            </li>
            {shipQuery.data?.nav.status === 'IN_TRANSIT' && (
              <li className="flex justify-between items-center py-3 sm:py-4 px-2">
                {`Arrival: ${DateTime.fromISO(shipQuery.data?.nav.route.arrival)
                  .diffNow(['days', 'hours', 'minutes'])
                  .toHuman({
                    unitDisplay: 'short',
                    maximumFractionDigits: 0,
                  })}`}
              </li>
            )}
            <li className="flex justify-between items-center py-3 sm:py-4 px-2">
              {shipQuery.data?.nav.status === 'DOCKED' && (
                <>
                  <Button
                    type="button"
                    style="secondary"
                    onClick={handleOrbitClick}
                    disabled={dockMutation.isPending}
                  >
                    To Orbit
                  </Button>
                  <Button
                    type="button"
                    style="yellow"
                    onClick={handleRefuelClick}
                  >
                    Refuel
                  </Button>
                </>
              )}
              {shipQuery.data?.nav.status === 'IN_ORBIT' && (
                <Button
                  type="button"
                  style="secondary"
                  onClick={handleDockClick}
                  disabled={dockMutation.isPending}
                >
                  To Dock
                </Button>
              )}
            </li>
          </ul>
        </div>
      )}
      <Outlet />
    </>
  );
}
