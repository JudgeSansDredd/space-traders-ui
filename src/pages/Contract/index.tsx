import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { MouseEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import { acceptContract, getContract } from '../../api/contracts';

export default function Contract() {
  const { contractId } = useParams();
  const queryClient = useQueryClient();

  const contractQuery = useQuery({
    queryKey: ['contract', contractId],
    queryFn: async () => {
      return getContract(contractId || '');
    },
    staleTime: 10 * 60 * 1000,
  });

  const checkMark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const acceptContractMutation = useMutation({
    mutationKey: ['acceptContract', contractId],
    mutationFn: async () => {
      return acceptContract(contractId || '');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
    },
  });

  const onAcceptClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    acceptContractMutation.mutate();
  };

  return (
    <>
      {contractQuery.isLoading && <div>Loading...</div>}
      {contractQuery.isSuccess && (
        <>
          <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white flex">
                {contractQuery.data.accepted ? checkMark : ''}
                {contractQuery.data.type}
              </h5>
              <div className="text-md font-bold leading-none text-gray-900 dark:text-white">
                {DateTime.fromISO(contractQuery.data.terms.deadline)
                  .diffNow(['days', 'hours', 'minutes'])
                  .toHuman({ unitDisplay: 'short', maximumFractionDigits: 0 })}
              </div>
            </div>
            <div>
              {contractQuery.data.terms.deliver.map((deliver) => {
                return (
                  <div className="flex justify-between items-center py-3 sm:py-4 px-2">
                    <div>{`${deliver.unitsRequired} ${deliver.tradeSymbol} to ${deliver.destinationSymbol}`}</div>
                  </div>
                );
              })}
              <div className="flex justify-between items-center py-3 sm:py-4 px-2">
                <div>{`Up Front: ${contractQuery.data.terms.payment.onAccepted.toLocaleString()} / On Delivery: ${contractQuery.data.terms.payment.onFulfilled.toLocaleString()}`}</div>
              </div>
            </div>
            {!contractQuery.data.accepted && (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={onAcceptClick}
              >
                Accept Contract
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
