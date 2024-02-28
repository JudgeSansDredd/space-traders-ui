import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { WaypointType } from '../api/nav/types';
import { navigate } from '../api/ship/navigate';
import Button from '../components/Button';

interface PropType {
  shipSymbol: string;
  waypoint: WaypointType;
}

export default function WaypfointNavigate(props: PropType) {
  const { shipSymbol, waypoint } = props;

  const navigateMutator = useMutation({
    mutationKey: ['navigate', shipSymbol],
    mutationFn: async () => {
      return navigate(shipSymbol, waypoint.symbol);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onTravelClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigateMutator.mutate();
  };

  return (
    <li className="flex justify-between items-center py-3 sm:py-4 px-2">
      <div>{waypoint.symbol}</div>
      <Button type="button" onClick={onTravelClick}>
        Travel
      </Button>
    </li>
  );
}
