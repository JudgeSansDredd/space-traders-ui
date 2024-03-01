import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { WaypointType } from '../api/navigate/types';
import { navigate } from '../api/ship/navigate';
import Button from './Button';

interface PropType {
  shipSymbol: string;
  waypoint: WaypointType;
  disabled: boolean;
}

export default function WaypfointNavigate(props: PropType) {
  const { shipSymbol, waypoint, disabled } = props;
  const queryClient = useQueryClient();

  const navigateMutator = useMutation({
    mutationKey: ['navigate', shipSymbol],
    mutationFn: async () => {
      return navigate(shipSymbol, waypoint.symbol);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ships'] });
      queryClient.invalidateQueries({ queryKey: ['ship', shipSymbol] });
    },
  });

  const onTravelClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigateMutator.mutate();
  };

  return (
    <li className="flex justify-between items-center py-3 sm:py-4 px-2">
      <div>
        <div>{waypoint.symbol}</div>
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
