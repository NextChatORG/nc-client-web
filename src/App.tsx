import { UserContext } from '@nc-core/contexts';
import { userReducer, userReducerInitialState } from '@nc-core/reducers';
import { useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function App(): JSX.Element {
  const [state, dispatch] = useReducer(userReducer, userReducerInitialState);

  return (
    <UserContext.Provider value={{ dispatch, state }}>
      <Outlet />
      <ToastContainer
        hideProgressBar
        position="bottom-center"
        theme="colored"
      />
    </UserContext.Provider>
  );
}
