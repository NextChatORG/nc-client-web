import { useAuth } from '@nc-core/hooks';
import { MainTemplate } from '@nc-ui';
import { Link } from 'react-router-dom';

export default function Error404(): JSX.Element | null {
  const { isLogged } = useAuth();

  const Component = (
    <div className="h-full px-2 flex flex-col items-center justify-center gap-[42px]">
      <h2 className="rounded-lg px-2 py-[6px] bg-red-500 text-[96px] font-bold tracking-wide">
        404
      </h2>
      <div className="flex flex-col items-center gap-[6px]">
        <h3 className="text-title text-[26px] font-bold tracking-wide">
          Página no encontrada
        </h3>
        <p className="text-center tracking-wide">
          La página que estás buscando no existe, haz{' '}
          <Link className="underline" to="/">
            click aquí
          </Link>{' '}
          para volver al inicio
        </p>
      </div>
    </div>
  );

  if (isLogged) {
    return (
      <MainTemplate noPadding>
        <div className="h-[100vh] basis-full">{Component}</div>
      </MainTemplate>
    );
  }

  return <div className="h-[100vh]">{Component}</div>;
}
