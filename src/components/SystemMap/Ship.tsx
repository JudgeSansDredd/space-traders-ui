import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { ShipType } from '../../api/ship/types';

interface PropType {
  ship: ShipType;
  minY: number;
  minX: number;
}

export default function Ship(props: PropType) {
  const { ship, minY, minX } = props;
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Calculate positional data
  const dx = ship.nav.route.destination.x - ship.nav.route.origin.x;
  const dy = ship.nav.route.destination.y - ship.nav.route.origin.y;
  const originY = ship.nav.route.origin.y - minY + 20;
  const originX = ship.nav.route.origin.x - minX + 20;

  // Calculate the ratio of the route travelled
  const getRatioTravelled = () => {
    const departureTime = DateTime.fromISO(ship.nav.route.departureTime);
    const arrivalTime = DateTime.fromISO(ship.nav.route.arrival);
    if (arrivalTime.diffNow().milliseconds < 0) return 1;
    const totalTravel = arrivalTime.diff(departureTime).as('milliseconds');
    const timeTravelled = DateTime.now().diff(departureTime).as('milliseconds');
    return timeTravelled / totalTravel;
  };

  // Calculate the ship's current position
  const calculatePosition = () => {
    const ratioTravelled = getRatioTravelled();
    const positionX = originX + dx * ratioTravelled;
    const positionY = originY + dy * ratioTravelled;
    setPosition({ x: positionX, y: positionY });
  };

  // create setinterval that calls getRatioTravelled every 5 seconds
  useEffect(() => {
    calculatePosition();
    const interval = setInterval(() => {
      calculatePosition();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // calculate a heading
  const angle = Math.atan2(-1 * dy, dx) * (180 / Math.PI); // Math degrees (y works differently in math, high is up, low is down)
  const heading = (-1 * angle + 90) % 360; // compass degrees

  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      <g transform={`rotate(${heading - 45} 11 11)`}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={'white'}
          d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
        />
      </g>
    </g>
  );
}
