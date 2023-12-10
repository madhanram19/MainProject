import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import HomePage from './pages/home';

import Mainlayout from "./layout/mainlayout";

import Loginpage from "./pages/login";
import Registerpage from "./pages/register";
import Forgetpassword from "./pages/forgetpassword";
import Securitycode from "./pages/securitycode";

// import Marketpage from './pages/market';
import AppLayout from "./layout/applayout";
// import Dashboard from './pages/dashboard';
import Profilepage from "./pages/profile";
// import BankDetailspage from './pages/bankdetails';
// import Transactionspage from './pages/transactions';
// import Exchangepage from './pages/exchange';
import Securitypage from "./pages/security";
// import SupportPage from './pages/support';
// import TotalWalletAmt from './pages/Totalwallet';
// import NotFoundoundpage from './pages/notfound';
import ContactusPage from "./pages/contactus";
// import Faqpage from './pages/faq';
import TermsConditionPage from "./pages/terms";
import AboutUsPage from "./pages/about";
import TradePage from "./pages/trade";
import Resetpassword from "./pages/resetpassword";
import { ToastContainer } from "react-toastify";
import BankDetailspage from "./pages/bankdetails";

function App() {
  return (
    <BrowserRouter>
      <>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            {/* <Route index element={ <HomePage/> } />    */}
            <Route index element={<Loginpage />} />
            <Route path="/register" element={<Registerpage />} />
            <Route path="/securitycode" element={<Securitycode />} />
            <Route path="/forgetpassword" element={<Forgetpassword />} />
            <Route path="/resetpassword" element={<Resetpassword />} />
            <Route path="/terms" element={<TermsConditionPage />} />
            {/* <Route path="/market" element={<Marketpage /> } />
          <Route path='/wallet' element={ <TotalWalletAmt /> }/> */}
            <Route path="/contactus" element={<ContactusPage />} />
            {/* <Route path='/faq' element={<Faqpage/>}/>
          <Route path='/terms' element={<TermsConditionPage />} /> */}
            <Route path="/aboutus" element={<AboutUsPage />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            {/* <Route path='/dashboard' element={<Dashboard />} /> */}
            <Route path="/profile" element={<Profilepage />} />
            <Route path="/bank-details" element={<BankDetailspage />} />
            {/* <Route path='/transaction' element={<Transactionspage />}/> */}
            {/* <Route path='/exchange' element={<Exchangepage />}/> */}
            <Route path="/security" element={<Securitypage />} />
            {/* <Route path='/support' element={<SupportPage />}/> */}
          </Route>
          <Route path="/trade" element={<TradePage />} />
          {/* <Route path='/notfound' element={<NotFoundoundpage/>}/> */}
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
