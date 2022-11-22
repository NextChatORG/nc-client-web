import { useAuth } from '@nc-core/hooks';
import { Header, Sidebar } from '@nc-ui';
import clsx from 'clsx';

export interface MainTemplateProps {
  header?: { withOffset: boolean } | boolean;
  noPadding?: boolean;
}

export function MainTemplate({
  children,
  header = false,
  noPadding = false,
}: React.PropsWithChildren<MainTemplateProps>): JSX.Element {
  const { isLogged } = useAuth();

  return (
    <div className="flex">
      <Sidebar
        withHeader={
          typeof header === 'object' || (typeof header === 'boolean' && header)
        }
      />
      <section
        className={clsx('h-[100vh] flex-1 flex flex-wrap content-start gap-2', {
          'p-2': !noPadding,
        })}
      >
        {isLogged && header && (
          <div className="basis-full">
            <Header
              withOffset={
                typeof header === 'object' ? header.withOffset : false
              }
            />
          </div>
        )}
        {children}
      </section>
    </div>
  );
}
