import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import { RegisterResponseType } from '../api/agent/types';
import { useVerifyQuery } from '../api/hooks';
import Agent from '../components/Agent';
import Button from '../components/Button';

export default function Auth() {
  const callsignRef = useRef<HTMLInputElement>(null);
  const factionRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const authToken = window.localStorage.getItem('space-traders-token');

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
      window.localStorage.setItem('space-traders-token', data.data.token);
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${data.data.token}`;
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.error.message);
      }
    },
  });

  const verifyQuery = useVerifyQuery(authToken);

  const formSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!callsignRef.current || !factionRef.current) return;
    const callsign = callsignRef.current.value;
    const faction = factionRef.current.value;
    newTokenMutator.mutate({ callsign, faction });
  };

  const tokenSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!tokenRef.current) return;
    const token = tokenRef.current.value;
    window.localStorage.setItem('space-traders-token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    queryClient.invalidateQueries({ queryKey: ['verify', authToken] });
  };

  return (
    <>
      {(verifyQuery.isLoading || verifyQuery.isFetching) && (
        <p className="max-w-sm mx-auto">Loading...</p>
      )}
      {(verifyQuery.isPending || verifyQuery.isError) && (
        <>
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
            <Button type="submit">Submit</Button>
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

          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              or
            </span>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={tokenSubmit}>
            <div className="mb-5">
              <label
                htmlFor="auth-token"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter your token
              </label>
              <input
                ref={tokenRef}
                id="auth-token"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </>
      )}
      {verifyQuery.isSuccess && (
        <Agent agent={verifyQuery.data} authToken={authToken} />
      )}
    </>
  );
}
