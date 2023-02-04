import React from 'react';
import axios from "axios";
import {api} from "./config/api";
import LayoutRoutes from "./pages/LayoutRoutes";
import AuthRoutes from "./pages/AuthRoutes";

axios.defaults.baseURL = 'https://cryxxxen.pythonanywhere.com'

function App() {
  const [refresh, setRefresh] = React.useState(0)
  const refreshToken = localStorage.getItem('refreshToken')
  const username = localStorage.getItem('username')
  
  React.useEffect(() => {
    api.refreshToken({refresh: refreshToken})
      .then(r => r.data && localStorage.setItem('accessToken', r.data.access))
    
    setTimeout(() => {
      setRefresh(prev => prev + 1)
    }, 60000)
    
  }, [refresh])
  
  
  return username ? <LayoutRoutes/> : <AuthRoutes/>
}

export default App;
