import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { MouseEventHandler } from 'react';
import { WaypointType } from '../api/navigate/types';
import { navigate } from '../api/ship/navigate';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setWaypoint } from '../store/slices/navSlice';
import { makeHumanReadable } from '../utils';
import Button from './Button';

interface PropType {
  shipSymbol: string;
  waypoint: WaypointType;
  disabled: boolean;
}

export default function WaypfointNavigate(props: PropType) {
  const { shipSymbol, waypoint, disabled } = props;
  const queryClient = useQueryClient();
  const selectedWaypoint = useAppSelector((state) => state.nav.waypoint);
  const dispatch = useAppDispatch();

  const navigateMutator = useMutation({
    mutationKey: ['navigate', shipSymbol],
    mutationFn: async () => {
      return navigate(shipSymbol, waypoint.symbol);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ships'] });
    },
  });

  const onTravelClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigateMutator.mutate();
  };

  const onMouseEnter: MouseEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
    dispatch(setWaypoint(waypoint.symbol));
  };

  const onMouseLeave: MouseEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
    dispatch(setWaypoint(null));
  };

  return (
    <li
      className={`flex justify-between items-center py-3 sm:py-4 px-2 ${selectedWaypoint === waypoint.symbol ? 'bg-blue-200 dark:bg-slate-700' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <div>{waypoint.symbol}</div>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          {makeHumanReadable(waypoint.type)}
        </p>
        {waypoint.traits.map((trait) => {
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
      {!disabled && (
        <Button type="button" onClick={onTravelClick}>
          Travel
        </Button>
      )}
    </li>
  );
}
