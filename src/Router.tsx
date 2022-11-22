import { AuthRedirection } from '@nc-ui';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Error404 from './pages/Error404';

const Landing = lazy(() => import('./pages/auth/Landing'));
const LogIn = lazy(() => import('./pages/auth/LogIn'));
const RecoverAccount = lazy(() => import('./pages/auth/RecoverAccount'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));

const Beta = lazy(() => import('./pages/information/Beta'));

const Chat = lazy(() => import('./pages/Chat'));
const Profile = lazy(() => import('./pages/Profile/index'));
const Settings = lazy(() => import('./pages/Profile/Settings/index'));
const SettingsChangePassword = lazy(
  () => import('./pages/Profile/Settings/tabs/SettingsChangePasswordTab'),
);

const router = createBrowserRouter([
  {
    children: [
      {
        element: <AuthRedirection Logged={Chat} NoLogged={Landing} />,
        index: true,
      },
      {
        element: <AuthRedirection redirectToIndex NoLogged={LogIn} />,
        path: 'login',
      },
      {
        element: <AuthRedirection redirectToIndex NoLogged={RecoverAccount} />,
        path: 'recover-account',
      },
      {
        element: <AuthRedirection redirectToIndex NoLogged={SignUp} />,
        path: 'signup',
      },
      {
        element: <Beta />,
        path: 'beta',
      },
      {
        children: [
          {
            element: <AuthRedirection redirectToIndex Logged={Chat} />,
            index: true,
          },
          {
            element: <AuthRedirection redirectToIndex Logged={Chat} />,
            path: ':chatId',
          },
        ],
        path: 'chat',
      },
      {
        children: [
          {
            element: <AuthRedirection redirectToIndex Logged={Profile} />,
            index: true,
          },
          {
            children: [
              {
                children: [
                  {
                    element: (
                      <AuthRedirection
                        redirectToIndex
                        Logged={SettingsChangePassword}
                      />
                    ),
                    path: 'change-password',
                  },
                ],
                element: <AuthRedirection redirectToIndex Logged={Settings} />,
                path: 'settings',
              },
            ],
            element: <AuthRedirection redirectToIndex Logged={Profile} />,
            path: ':username',
          },
        ],
        path: 'profile',
      },
    ],
    errorElement: <Error404 />,
    path: '/',
  },
]);

export default router;
