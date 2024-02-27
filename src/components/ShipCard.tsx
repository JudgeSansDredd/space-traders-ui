import { Link } from 'react-router-dom';
import { ShipType } from '../api/ship/types';

interface PropType {
  ship: ShipType;
}

export default function ShipCard({ ship }: PropType) {
  return (
    <Link to={`/ships/${ship.symbol}`}>
      <li className="py-3 sm:py-4 px-2">
        <div className="flex items-center">
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {ship.symbol}
            </p>
            <p
              className="text-sm text-gray-500 truncate dark:text-gray-400"
              title={ship.frame.description}
            >
              {ship.frame.name}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            Location: {ship.nav.waypointSymbol}
          </div>
        </div>
      </li>
    </Link>
  );
}
