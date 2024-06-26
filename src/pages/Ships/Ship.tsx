import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useShipQuery, useWaypointsQuery } from '../../api/hooks';
import { extract, refuel } from '../../api/ship';
import { dock, orbit } from '../../api/ship/navigate';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import Info from '../../components/Info';
import TimedProgress from '../../components/TimedProgress';
import { makeHumanReadable } from '../../utils';

export default function Ship() {
  const { shipSymbol } = useParams();
  const queryClient = useQueryClient();
  const [showDockingAlert, setShowDockingAlert] = useState<boolean>(false);
  const [showRefuelAlert, setShowRefuelAlert] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [showTransit, setShowTransit] = useState<boolean>(false);

  const shipQuery = useShipQuery(shipSymbol);
  const waypointQuery = useWaypointsQuery(shipQuery.data?.nav.systemSymbol);

  const waypoint = waypointQuery.data?.data.find(
    (waypoint) => waypoint.symbol === shipQuery.data?.nav.waypointSymbol
  );

  useEffect(() => {
    if (shipQuery.data?.cooldown.remainingSeconds) {
      const now = DateTime.now();
      setCooldownTime({
        start: now.toISO(),
        end: now
          .plus({
            seconds: shipQuery.data.cooldown.remainingSeconds,
          })
          .toISO(),
      });
    }
  }, [shipQuery.data?.cooldown.remainingSeconds]);

  const dockMutation = useMutation({
    mutationKey: ['docking', shipSymbol],
    mutationFn: (action: 'orbit' | 'dock') => {
      return action === 'orbit'
        ? orbit(shipSymbol || '')
        : dock(shipSymbol || '');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ships'] });
      setShowDockingAlert(true);
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
      setShowRefuelAlert(true);
    },
  });

  const extractMutation = useMutation({
    mutationKey: ['extract', shipSymbol],
    mutationFn: () => {
      return extract(shipSymbol || '');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ships'] });
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

  const handleExtractClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    extractMutation.mutate();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!shipQuery.data) {
        setShowTransit(false);
        return () => clearInterval(interval);
      }
      const arrival = DateTime.fromISO(shipQuery.data.nav.route.arrival);
      setShowTransit(arrival > DateTime.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [shipQuery.data?.nav.route.arrival]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cooldownTime) {
        const now = DateTime.now();
        const end = DateTime.fromISO(cooldownTime.end);
        if (now > end) {
          setCooldownTime(null);
        }
      }
    });
    return () => clearInterval(interval);
  }, [cooldownTime]);

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
            {shipQuery.data && showTransit && (
              <li className="flex justify-between items-center py-3 sm:py-4 px-2">
                <div className="mr-2">Transit</div>
                <TimedProgress
                  startTime={shipQuery.data.nav.route.departureTime}
                  endTime={shipQuery.data.nav.route.arrival}
                />
              </li>
            )}
            {cooldownTime && (
              <li className="flex justify-between items-center py-3 sm:py-4 px-2">
                <div className="mr-2">Cooldown</div>
                <TimedProgress
                  startTime={cooldownTime.start}
                  endTime={cooldownTime.end}
                />
              </li>
            )}
            <li className="flex justify-between items-center py-3 sm:py-4 px-2">
              {shipQuery.data?.nav.status === 'DOCKED' && (
                <>
                  <Button
                    type="button"
                    color="secondary"
                    onClick={handleOrbitClick}
                    disabled={dockMutation.isPending}
                  >
                    To Orbit
                  </Button>
                  <Button
                    type="button"
                    color="yellow"
                    onClick={handleRefuelClick}
                  >
                    Refuel
                  </Button>
                </>
              )}
              {shipQuery.data?.nav.status === 'IN_ORBIT' && (
                <>
                  <Button
                    type="button"
                    color="secondary"
                    onClick={handleDockClick}
                    disabled={dockMutation.isPending}
                  >
                    To Dock
                  </Button>
                  <Button
                    type="button"
                    color="green"
                    onClick={handleExtractClick}
                    disabled={
                      extractMutation.isPending || cooldownTime !== null
                    }
                  >
                    Extract
                  </Button>
                </>
              )}
            </li>
            {showDockingAlert && dockMutation.isSuccess && (
              <li>
                <Info
                  text={`The ship has successfully ${dockMutation.variables === 'orbit' ? 'orbited' : 'docked'}.`}
                  visible={showDockingAlert}
                  dismissClick={() => setShowDockingAlert(false)}
                />
              </li>
            )}
            {showRefuelAlert && refuelMutation.isSuccess && (
              <li>
                <Info
                  text={`The ship has successfully refueled. You spent ${refuelMutation.data?.transaction.totalPrice} credits`}
                  visible={showRefuelAlert}
                  dismissClick={() => setShowRefuelAlert(false)}
                />
              </li>
            )}
          </ul>
        </div>
      )}
      <Outlet />
    </>
  );
}
