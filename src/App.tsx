
import { useEffect, useState } from 'react';
import './App.css'

import AuthProvider, { useAuth } from './provider/authProvider'
import MyRoutes from './routes'
import LoaderLogo, { LoaderLogoRemover } from './components/common/LoaderLogo';



function App() {
  const [loading, setLoading] = useState(true);
/*
  useEffect(() => {
    // Simulate loading or listen to route transitions
    setTimeout(() => setLoading(false), 0); // Or better: detect data readiness
  }, []);
*/
console.log("App")
  return (
    <AuthProvider>
      {/*loading && <LoaderLogoRemover/>*/}
      <MyRoutes setLoading={setLoading}/>
    </AuthProvider>
  );
}

export default App;



