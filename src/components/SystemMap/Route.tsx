import { RouteType } from '../../api/ship/types';

interface PropType {
  route: RouteType;
  minX: number;
  minY: number;
}

export default function Route(props: PropType) {
  const { route, minX, minY } = props;

  const x1 = route.origin.x - minX + 30;
  const y1 = route.origin.y - minY + 30;
  const x2 = route.destination.x - minX + 30;
  const y2 = route.destination.y - minY + 30;
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="white"
      strokeWidth={3}
      strokeDasharray="10 5"
    />
  );
}
