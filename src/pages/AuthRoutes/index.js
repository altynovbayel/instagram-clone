import React from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import * as AuthPages from "../../apps/AuthPages";

function AuthRoutes() {
  const user = localStorage.getItem('username')
  const navigate = useNavigate()

  React.useEffect(() => {
    !user && navigate('auth/login')
  }, [user])
  
  return (
    <>
      <Routes>
        <Route path={'/auth/register'} element={<AuthPages.Register/>}/>
        <Route path={'/auth/login'} element={<AuthPages.Login/>}/>
      </Routes>
    </>
  );
}

export default AuthRoutes;