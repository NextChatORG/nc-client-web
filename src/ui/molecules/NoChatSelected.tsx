import { Link } from 'react-router-dom';

export function NoChatSelected(): JSX.Element {
  return (
    <div className="flex-1 hidden lg:flex flex-col items-center justify-center">
      <img alt="Begin chat" className="w-[30%]" src="/images/begin-chat.svg" />
      <h4 className="mt-2 text-center text-title">
        Selecciona una conversación
      </h4>
      <p className="mt-[8px] text-center text-body">
        Si no tienes una conversación puedes buscar{' '}
        <Link className="underline" to="/explore">
          nuevas conexiones
        </Link>
      </p>
    </div>
  );
}
