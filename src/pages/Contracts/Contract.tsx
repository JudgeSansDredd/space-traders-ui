import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { MouseEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import { acceptContract, getContract } from '../../api/contracts';
import Button from '../../components/Button';
import checkmark from '../../components/Checkmark';

export default function Contract() {
  const { contractId } = useParams();
  const queryClient = useQueryClient();

  const contractQuery = useQuery({
    queryKey: ['contract', contractId],
    queryFn: async () => {
      return getContract(contractId);
    },
    staleTime: 10 * 60 * 1000,
  });

  const acceptContractMutation = useMutation({
    mutationKey: ['acceptContract', contractId],
    mutationFn: async () => {
      return acceptContract(contractId);
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
                {contractQuery.data?.accepted ? checkmark : ''}
                {contractQuery.data?.type}
              </h5>
              <div className="text-md font-bold leading-none text-gray-900 dark:text-white">
                {contractQuery.data &&
                  DateTime.fromISO(contractQuery.data.terms.deadline)
                    .diffNow(['days', 'hours', 'minutes'])
                    .toHuman({
                      unitDisplay: 'short',
                      maximumFractionDigits: 0,
                    })}
              </div>
            </div>
            <div>
              {contractQuery.data?.terms.deliver.map((deliver) => {
                return (
                  <div className="flex justify-between items-center py-3 sm:py-4 px-2">
                    <div>{`${deliver.unitsRequired} ${deliver.tradeSymbol} to ${deliver.destinationSymbol}`}</div>
                  </div>
                );
              })}
              <div className="flex justify-between items-center py-3 sm:py-4 px-2">
                <div>{`Up Front: ${contractQuery.data?.terms.payment.onAccepted.toLocaleString()} / On Delivery: ${contractQuery.data?.terms.payment.onFulfilled.toLocaleString()}`}</div>
              </div>
            </div>
            {!contractQuery.data?.accepted && (
              <Button type="button" onClick={onAcceptClick}>
                AcceptContract
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
}
