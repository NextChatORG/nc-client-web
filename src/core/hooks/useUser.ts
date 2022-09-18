import { JWT_TOKEN } from '@nc-core/constants/local-storage';
import { UserContext } from '@nc-core/contexts';
import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

export interface UserData {
  id: string;
  username: string;
}

export interface UserHook {
  data: UserData | null;
  logOut(): void;
  isLogged(): boolean;
}

export function useUser(): UserHook {
  const { dispatch, state } = useContext(UserContext);

  function getData(): UserData | null {
    if (!state || !state.jwt || !state.jwt.length) {
      return null;
    }

    const payload = jwtDecode<{ sub: string; username: string }>(state.jwt);

    return {
      id: payload.sub,
      username: payload.username,
    };
  }

  return {
    data: getData(),
    logOut() {
      if (!dispatch) return;

      localStorage.removeItem(JWT_TOKEN);

      dispatch({ type: 'logout' });
    },
    isLogged() {
      return state?.jwt !== null;
    },
  };
}
