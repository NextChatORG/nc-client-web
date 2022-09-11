import { AuthRedirection } from '@nc-ui';
import { Route, Routes } from "react-router-dom";
import App from "./App";
import { LandingView, Login, SignUp } from "./pages";

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<AuthRedirection whenLogged={<div>Logged</div>} whenNoLogged={<LandingView />} />} />
        <Route path="login" element={<AuthRedirection whenNoLogged={<Login />} />} />
        <Route path="signup" element={<AuthRedirection whenNoLogged={<SignUp />} />} />
      </Route>
    </Routes>
  );
}
