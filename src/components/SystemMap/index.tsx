import { WaypointType } from '../../api/navigate/types';
import Waypoint from './Waypoint';

interface PropType {
  waypoints: WaypointType[];
}

export default function SystemMap(props: PropType) {
  const { waypoints } = props;

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
    </svg>
  );
}
