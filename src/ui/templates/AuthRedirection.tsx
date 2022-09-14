import { useUser } from '@nc-core/hooks';
import { Navigate } from 'react-router-dom';

export interface AuthRedirectionProps {
  whenLogged?: JSX.Element;
  whenNoLogged?: JSX.Element;
}

export function AuthRedirection({
  whenLogged,
  whenNoLogged,
}: AuthRedirectionProps): JSX.Element | null {
  const { isLogged } = useUser();

  if (!isLogged()) {
    return whenNoLogged ?? <Navigate to="/" />;
  }

  return whenLogged ?? null;
}
