import { AuthRedirection } from '@nc-ui';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';

const LandingView = lazy(() => import('./pages/LandingView/index'));
const LogIn = lazy(() => import('./pages/LogIn'));
const SignUp = lazy(() => import('./pages/SignUp'));

const Chat = lazy(() => import('./pages/Chat'));
const Profile = lazy(() => import('./pages/Profile/index'));

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          index
          element={<AuthRedirection Logged={Chat} NoLogged={LandingView} />}
        />
        <Route
          path="login"
          element={<AuthRedirection redirectToIndex NoLogged={LogIn} />}
        />
        <Route
          path="signup"
          element={<AuthRedirection redirectToIndex NoLogged={SignUp} />}
        />
        <Route path="chat">
          <Route
            index
            element={<AuthRedirection redirectToIndex Logged={Chat} />}
          />
          <Route
            path=":id"
            element={<AuthRedirection redirectToIndex Logged={Chat} />}
          />
        </Route>
        <Route path="profile">
          <Route
            index
            element={<AuthRedirection redirectToIndex Logged={Profile} />}
          />
          <Route
            path=":username"
            element={<AuthRedirection redirectToIndex Logged={Profile} />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
