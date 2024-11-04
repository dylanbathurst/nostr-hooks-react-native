import NDK, { NDKUser } from '@nostr-dev-kit/ndk';
import { useEffect, useState } from 'react';

import { useSigner } from '../use-signer';

/**
 * Custom hook that retrieves the active user using the NDK instance and the signer.
 *
 * @param fetchProfile - Optional boolean indicating whether to fetch profile for the active user. Default is false.
 * @returns An object containing the active user or undefined if there is no active user.
 */
export const useActiveUser = (params?: {
  fetchProfile?: boolean | undefined;
  customNdk?: NDK | undefined;
}) => {
  const [activeUser, setActiveUser] = useState<NDKUser | undefined>(undefined);

  const { signer } = useSigner(params?.customNdk ? { customNdk: params.customNdk } : undefined);

  useEffect(() => {
    console.log('signer', signer);
    if (signer) {
      signer.user().then((user) => {
        if (!user) return;

        if (params?.fetchProfile) {
          user.fetchProfile().finally(() => {
            console.log('fetching profile and setting active user', user);
            setActiveUser(user);
          });
        } else {
          console.log('just setting active user', user);
          setActiveUser(user);
        }
      });
    } else {
      console.log('no signer acive user undefined');
      setActiveUser(undefined);
    }
  }, [signer, params?.fetchProfile]);

  return { activeUser };
};
