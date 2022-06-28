import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './HomePage';
import LoginPage from './pages/LoginPage'
import OrderDetailsHome from './OrderDetailsHome';
import AddOrder from './AddOrder'
import CustomerCRUD from './CustomerCRUD';
import CustomerDetails from './CustomerDetails';
import Gmail from './Gmail'
import BillPage from './BillPage';
import RatesUpdater from './RatesUpdater';
import AppbarHead from './AppbarHead';
import Addblousesalwar from './Addblousesalwar'
import Reports from './Reports'
import DesignTeamView from './DesignTeamView'
import ResetPage from './ResetPage'
import React, { useEffect } from "react";
import DashBoard from './DashBoard';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';

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
          <Route exact path='/addOrder' element={<AddOrder />} />
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





