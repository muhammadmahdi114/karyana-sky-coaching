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
import PrivacyPolicy from './Components/PrivacyPolicy/privacyPolicy';
import TermsNCondtion from './Components/TermsNConditions/termsNCondition';
import AboutUs from './Components/AboutUs/aboutUs';
import Users from './Components/Users/users';
import BookingsReq from './Components/BookingsReq/bookingsReq';
import BookingReqDetails from './Components/BookingsReqDetails/bookingsReqDetails';

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
        <Route path="/services" element={<ServiceList />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsNCondtion />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/bookings-req" element={<BookingsReq />} />
        <Route path="/booking-details/:bookingId" element={<BookingReqDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
