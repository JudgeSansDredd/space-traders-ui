import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { verifyToken } from '../api/agent';
import { RegisterResponseType } from '../api/agent/types';
import Agent from '../components/Agent';
import { useAppDispatch } from '../store/hooks';
import { setAgent } from '../store/slices/authSlice';

export default function Auth() {
  const callsignRef = useRef<HTMLInputElement>(null);
  const factionRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  // const agent = useAppSelector((state) => state.auth.agent);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const newTokenMutator = useMutation({
    mutationKey: ['newToken'],
    mutationFn: (data: { callsign: string; faction: string }) => {
      const { callsign, faction } = data;
      return axios
        .post<RegisterResponseType>('/register', {
          symbol: callsign,
          faction,
        })
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      setErrorMessage(null);
      dispatch(setAgent(data.data.agent));
      window.localStorage.setItem('space-traders-token', data.data.token);
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${data.data.token}`;
      verifyQuery.refetch();
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.error.message);
      }
    },
  });

  const verifyQuery = useQuery({
    queryKey: ['verify'],
    queryFn: () => {
      return verifyToken();
    },
  });

  const formSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!callsignRef.current || !factionRef.current) return;
    const callsign = callsignRef.current.value;
    const faction = factionRef.current.value;
    newTokenMutator.mutate({ callsign, faction });
  };

  return (
    <>
      {verifyQuery.isLoading && <p>Loading...</p>}
      {verifyQuery.isError && (
        <form className="max-w-sm mx-auto" onSubmit={formSubmit}>
          <div className="mb-5">
            <label
              htmlFor="callsign"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Callsign
            </label>
            <input
              ref={callsignRef}
              type="text"
              id="callsign"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="SP4CE_TR4DER"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="faction"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your faction
            </label>
            <input
              ref={factionRef}
              type="text"
              id="faction"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="COSMIC"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          {errorMessage && (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Oops!</span> {errorMessage}
              </div>
            </div>
          )}
        </form>
      )}
      {verifyQuery.isSuccess && <Agent agent={verifyQuery.data} />}
    </>
  );
}
