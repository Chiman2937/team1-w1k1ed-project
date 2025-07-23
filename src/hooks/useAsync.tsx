'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface ISignal {
  signal?: AbortSignal;
}

interface AsyncFunctionArgs<P> extends ISignal {
  params: P;
}
//P: Params Type
//R: Response Type
export const useAsync = <P, R>(params: {
  asyncFunction: (args: AsyncFunctionArgs<P>) => Promise<R>;
  initialParams?: P;
  immediate: boolean;
}) => {
  const { asyncFunction, initialParams, immediate } = params;
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(
    async (params: P) => {
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);
      setError(null);

      try {
        const response = await asyncFunction({ params, signal: controller.signal });
        setData(response);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('알 수 없는 오류가 발생했습니다.'));
        }
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [asyncFunction],
  );

  const cancel = () => {
    if (!isLoading) return;
    abortRef.current?.abort();
  };

  useEffect(() => {
    if (!immediate || !initialParams) return;
    run(initialParams);
  }, []);

  return { data, error, isLoading, run, cancel };
};
