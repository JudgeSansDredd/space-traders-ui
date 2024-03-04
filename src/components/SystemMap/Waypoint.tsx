import { useState } from 'react';
import { WaypointType } from '../../api/navigate/types';
import { makeHumanReadable } from '../../utils';

interface PropType {
  waypoint: WaypointType;
  minX: number;
  minY: number;
}

export default function Waypoint(props: PropType) {
  const { minX, minY, waypoint } = props;
  const [tooltipHidden, setTooltipHidden] = useState<boolean>(true);

  const x = waypoint.x - minX + 30;
  const y = waypoint.y - minY + 30;
  const tooltipTextLine1 = makeHumanReadable(waypoint.type);
  const tooltipTextLine2 = waypoint.symbol;
  const tooltipX = x + 10;
  const tooltipY = y - 10;
  const tooltipHeight = 44;
  const tooltipWidth =
    Math.max(tooltipTextLine1.length, tooltipTextLine2.length) * 8 + 10;
  const tooltipTextX = tooltipX + tooltipWidth / 2;
  const tooltipTextY = tooltipY + tooltipHeight / 2 - 7;

  const colors = {
    planet: 'fill-green-500',
    station: 'fill-blue-500',
    asteroid: 'fill-slate-300',
    default: 'fill-red-500',
  };

  const getColor = (type: string) => {
    if (type.includes('ASTEROID')) {
      return colors.asteroid;
    } else if (type.includes('PLANET')) {
      return colors.planet;
    } else if (type.includes('STATION')) {
      return colors.station;
    } else {
      return colors.default;
    }
  };

  const waypointMouseEnter = (e: React.MouseEvent<SVGCircleElement>) => {
    e.preventDefault();
    setTooltipHidden(false);
  };

  const waypointMouseLeave = (e: React.MouseEvent<SVGCircleElement>) => {
    e.preventDefault();
    setTooltipHidden(true);
  };

  return (
    <>
      <circle
        className={getColor(waypoint.type)}
        cx={x}
        cy={y}
        r={5}
        onMouseEnter={waypointMouseEnter}
        onMouseLeave={waypointMouseLeave}
      />
      <rect
        x={tooltipX}
        y={tooltipY}
        width={tooltipWidth}
        height={tooltipHeight}
        fill="white"
        stroke="black"
        strokeWidth={1}
        className={tooltipHidden ? 'hidden' : ''}
      />
      <text
        x={tooltipTextX}
        y={tooltipTextY}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        fontWeight="bold"
        fill="black"
        className={tooltipHidden ? 'hidden' : ''}
      >
        {tooltipTextLine1}
      </text>
      <text
        x={tooltipTextX}
        y={tooltipTextY + 14}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        fontWeight="bold"
        fill="black"
        className={tooltipHidden ? 'hidden' : ''}
      >
        {tooltipTextLine2}
      </text>
    </>
  );
}
