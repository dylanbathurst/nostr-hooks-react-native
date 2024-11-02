import NDK from '@nostr-dev-kit/ndk';
import { useEffect } from 'react';

import { useLogin } from '../use-login';

type Params = {
  customNdk: NDK;
  setCustomNdk: (customNdk: NDK) => void;
};

/**
 * Custom hook for automatic login functionality based on previously stored login method in local storage.
 *
 * @param params - Optional parameters for custom NDK instance and its setter function.
 */
export const useAutoLogin = (params?: Params) => {
  const { loginFromLocalStorage } = useLogin(
    {
      getValue: (key) => undefined,
      setValue: (key) => ({ setValue: async (nextValue?: string) => {} }),
    },
    params
  );

  useEffect(() => {
    loginFromLocalStorage();
  }, [loginFromLocalStorage]);
};
