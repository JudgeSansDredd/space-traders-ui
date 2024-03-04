import { DateTime } from 'luxon';
import { WaypointType } from '../../api/navigate/types';
import { ShipType } from '../../api/ship/types';
import Route from './Route';
import Ship from './Ship';
import Waypoint from './Waypoint';

interface PropType {
  waypoints: WaypointType[];
  ship?: ShipType | null;
}

export default function SystemMap(props: PropType) {
  const { waypoints, ship } = props;

  if (waypoints.length === 0) {
    return <div className="w-full">No Waypoints Provided</div>;
  }

  // const maxX = Math.max(...waypoints.map((wp) => wp.x));
  const minX = Math.min(...waypoints.map((wp) => wp.x));
  // const maxY = Math.max(...waypoints.map((wp) => wp.y));
  const minY = Math.min(...waypoints.map((wp) => wp.y));

  return (
    <svg className="w-full h-full">
      {waypoints.map((waypoint) => {
        return (
          <Waypoint
            key={waypoint.symbol}
            waypoint={waypoint}
            minX={minX}
            minY={minY}
          />
        );
      })}
      {ship && <Ship ship={ship} minX={minX} minY={minY} />}
      {ship &&
        ship.nav.route &&
        DateTime.fromISO(ship.nav.route.arrival).diffNow().milliseconds > 0 && (
          <Route route={ship.nav.route} minX={minX} minY={minY} />
        )}
    </svg>
  );
}
