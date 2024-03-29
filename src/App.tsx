import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './less/main.less';

import { useAuth } from './contexts/AuthContext';

import Login from './modules/Login';
import MainMenu from './modules/MainMenu';
// import ScanQRC from './modules/ScanQRC';
import ScanQRCode from './modules/ScanQRCode';
import GenerateQRC from './modules/GenerateQRC';
import PayPhoneNumberEmail from './modules/PayPhoneNumberEmail';
import ViewBalance from './modules/ViewBalance';

function App() {
  const { userLoggedIn, currentUser } = useAuth();

  return (
      <div className="App">
        {
          userLoggedIn ? (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainMenu />} />
                <Route path="/scan-qrc" element={<ScanQRCode />} />
                <Route path="/pay-phone-number-email" element={<PayPhoneNumberEmail />} />
                <Route path="/view-balance" element={<ViewBalance />} />
                <Route path="/generate-qrc" element={<GenerateQRC sellerName={currentUser.displayName} userId={currentUser.uid} />} />
              </Routes>
            </BrowserRouter>
          ) :
          <Login />
        }
      </div>
  );
}

export default App;