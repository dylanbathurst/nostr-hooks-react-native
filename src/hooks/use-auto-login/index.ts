import NDK from '@nostr-dev-kit/ndk';
import { useEffect } from 'react';

import { LocalStorage, useLogin } from '../use-login';

type Params = {
  customNdk: NDK;
  setCustomNdk: (customNdk: NDK) => void;
};

/**
 * Custom hook for automatic login functionality based on previously stored login method in local storage.
 *
 * @param params - Optional parameters for custom NDK instance and its setter function.
 */
export const useAutoLogin = (useLocalStorage: LocalStorage, params?: Params) => {
  const { loginFromLocalStorage } = useLogin(useLocalStorage, params);

  useEffect(() => {
    loginFromLocalStorage();
  }, [loginFromLocalStorage]);
};
