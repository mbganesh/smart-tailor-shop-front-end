import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import CustomerCRUD from './pages/CustomerCRUD';
import CustomerDetails from './pages/CustomerDetails';
import LoginPage from './pages/LoginPage'
import OrderDetailsHome from './pages/OrderDetailsHome';

import Gmail from './Gmail'
import BillPage from './BillPage';
import RatesUpdater from './pages/RatesUpdater';
import AppbarHead from './AppbarHead';
import Addblousesalwar from './pages/Addblousesalwar'
import Reports from './pages/Reports'
import DesignTeamView from './DesignTeamView'
import ResetPage from './ResetPage'
import React, { useEffect } from "react";
import DashBoard from './pages/DashBoard';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';


import RegisterPagePro from './pages/RegisterPagePro';

function App() {
  useEffect(() => {
    document.title = "Smart Tailor Shop";
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/register' element={<RegisterPage />} />
          <Route exact path='/homepage' element={<HomePage />} />
          <Route exact path='/orderDetailPage' element={<OrderDetailsHome />} />
          <Route exact path='/customer' element={<CustomerCRUD />} />
          <Route exact path='/customer-details' element={<CustomerDetails />} />
          <Route exact path='/mail' element={<Gmail />} />
          <Route exact path='/billPage' element={<BillPage />} />
          <Route exact path='/ratesupdater' element={<RatesUpdater />} />
          <Route exact path='/appbar' element={<AppbarHead />} />
          <Route exact path='/addblousesalwar' element={<Addblousesalwar />} />
          <Route exact path='/reports' element={<Reports />} />
          <Route exact path='/designingTeamView' element={<DesignTeamView />} />
          <Route exact path='/resetPage' element={<ResetPage />} />
          <Route exact path='/dashboard' element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;





