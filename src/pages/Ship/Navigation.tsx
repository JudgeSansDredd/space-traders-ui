import { useParams } from 'react-router-dom';
import { useShipQuery } from '../../api/hooks';

export default function Navigation() {
  const { shipSymbol } = useParams();

  const shipQuery = useShipQuery(shipSymbol || '');

  // const wayPointsQuery = useQuery({
  //   queryKey: ['wayPoints']
  // });

  return <div>This is the navigation pane</div>;
}
