import { AuthRedirection } from '@nc-ui';
import { lazy } from 'react';
import { Route, Routes } from "react-router-dom";
import App from "./App";

const LandingView = lazy(() => import('./pages/LandingView/index'));
const LogIn = lazy(() => import('./pages/LogIn'));
const SignUp = lazy(() => import('./pages/SignUp'));

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<AuthRedirection whenLogged={<div>Logged</div>} whenNoLogged={<LandingView />} />} />
        <Route path="login" element={<AuthRedirection whenNoLogged={<LogIn />} />} />
        <Route path="signup" element={<AuthRedirection whenNoLogged={<SignUp />} />} />
      </Route>
    </Routes>
  );
}
