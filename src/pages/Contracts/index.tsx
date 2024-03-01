import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { getContracts } from '../../api/contracts';
import ContractCard from '../../components/ContractCard';
import HomeLoginError from '../../components/HomeLoginError';

export default function Contracts() {
  const contractsQuery = useQuery({
    queryKey: ['contracts'],
    queryFn: async () => {
      return getContracts();
    },
    staleTime: 10 * 60 * 1000,
  });

  return (
    <>
      {contractsQuery.isLoading && <div>Loading...</div>}
      {contractsQuery.isError && <HomeLoginError />}
      <div className="flex overflow-y-auto space-x-2">
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Contracts
            </h5>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {contractsQuery.isSuccess &&
                contractsQuery.data.map((contract) => {
                  return <ContractCard key={contract.id} contract={contract} />;
                })}
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
