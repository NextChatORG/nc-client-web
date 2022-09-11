import { LogInResponse, LogInVariables, LOGIN_MUTATION } from "@nc-core/api";
import { JWT_TOKEN } from "@nc-core/constants/local-storage";
import { UserContext } from "@nc-core/contexts";
import { useContext } from "react";

export interface UserHook {
  logOut(): void;
  isLogged(): boolean;
}

export function useUser(): UserHook {
  const { dispatch, state } = useContext(UserContext);

  return {
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
