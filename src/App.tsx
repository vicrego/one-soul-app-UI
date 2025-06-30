
import './App.css'

import AuthProvider, { useAuth } from './provider/authProvider'
import MyRoutes from './routes'

function App() {
  return (
    <AuthProvider>
      <MyRoutes/>
    </AuthProvider>
  );
}

export default App;



