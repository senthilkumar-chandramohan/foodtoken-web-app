import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import './less/main.less'

import MainMenu from './modules/MainMenu';
import ScanQRC from './modules/ScanQRC';
import GenerateQRC from './modules/GenerateQRC';
import SetPhoneNumber from './modules/SetPhoneNumber';
import ViewBalance from './modules/ViewBalance';
import TransactionHistory from './modules/TransactionHistory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/scan-qrc" element={<ScanQRC />} />
          <Route path="/set-phone-number" element={<SetPhoneNumber />} />
          <Route path="/view-balance" element={<ViewBalance />} />
          <Route path="/generate-qrc" element={<GenerateQRC sellerName="LLP Catering" accountID={localStorage.getItem('accountID')} amount={20} />} />
          {/* <Route path="/view-transactions" element={<TransactionHistory />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;