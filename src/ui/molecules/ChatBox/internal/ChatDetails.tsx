import { USER_PROFILE_ROUTE } from '@nc-core/constants/routes';
import { User } from '@nc-core/interfaces/api';
import { ChevronLeftIcon } from '@nc-icons';
import { Button } from '@nc-ui';

interface ChatDetailsProps {
  user: User;
  onBackClick(): void;
}

export default function ChatDetails({
  onBackClick,
  user,
}: ChatDetailsProps): JSX.Element {
  return (
    <section className="basis-full bg-dark-700 p-2 sm:rounded-lg lg:basis-1/3 xl:(basis-1/4 py-3)">
      <Button
        className="mb-2 lg:hidden"
        color="white"
        onClick={onBackClick}
        size="extra-small"
        startIcon={<ChevronLeftIcon size="1.25em" />}
      >
        Volver
      </Button>
      <img
        alt={`${user.username}'s profile`}
        className="avatar-big mx-auto"
        src={user.profileImage}
      />
      <h4 className="mt-1 text-center text-xl font-medium tracking-wide xl:mt-2">
        {user.username}
      </h4>
      <Button
        fullWidth
        link
        className="mt-2 xl:mt-3"
        color="white"
        size="small"
        to={USER_PROFILE_ROUTE.replace(':username', user.username)}
        variant="outlined"
      >
        Ver perfil
      </Button>
      <Button
        fullWidth
        className="mt-1"
        color="error"
        onClick={() => undefined}
        size="small"
      >
        Eliminar amistad
      </Button>
    </section>
  );
}
