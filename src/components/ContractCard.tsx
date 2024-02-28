import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { ContractType } from '../api/contracts/types';
import checkmark from './Checkmark';

interface PropType {
  contract: ContractType;
}

export default function ContractCard({ contract }: PropType) {
  const deadline = DateTime.fromISO(contract.terms.deadline)
    .diffNow(['days', 'hours', 'minutes'])
    .toHuman({ unitDisplay: 'short', maximumFractionDigits: 0 });

  return (
    <Link to={`/contracts/${contract.id}`}>
      <li className="py-3 sm:py-4 px-2">
        <div className="flex items-center">
          <div className="flex-1 min-w-0 ms-4">
            <div className="flex">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {contract.type}
              </p>
              {contract.accepted && checkmark}
            </div>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {`Payment: ${(contract.terms.payment.onAccepted + contract.terms.payment.onFulfilled).toLocaleString()}`}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {deadline}
          </div>
        </div>
      </li>
    </Link>
  );
}
