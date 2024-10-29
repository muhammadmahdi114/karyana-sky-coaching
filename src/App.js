import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from './Components/Login/login';
import Dashboard from './Components/Dashboard/dashboard';
import Providers from './Components/Providers/providers';
import ProvidersReq from './Components/ProvidersReq/providersReq';
import ProvidersType from './Components/ProvidersType/providersType';
import Categories from './Components/Categories/categories';
import ServiceList from './Components/ServiceList/serviceList';
import Coupons from './Components/Coupons/coupons';
import FAQs from './Components/FAQs/faqs';

function App() {
  useEffect(() => {
    document.title = 'Karyana';
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/providers-req" element={<ProvidersReq />} />
        <Route path="/providers-type" element={<ProvidersType />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/service-list" element={<ServiceList />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/faqs" element={<FAQs />} />
      </Routes>
    </Router>
  );
}

export default App;
