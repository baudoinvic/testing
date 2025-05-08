import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home'
import Bank from './components/Banks/Bank'
import Hotels from './components/Hotels/Hotels'
import Restaurent from './components/Restaurent/Restaurent'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Layout from './components/Layout/Layout'
import Next from './components/Signup/Next';
import Writereview from './components/Writereview/Writereview';
import Detail from './components/Imageslider/Detail';
import ScrollToTop from './components/ScrolllToTop/ScrollToTop';
import Java from './components/Restaurent/Java';
import EditProfile from './components/Setting/EditProfile';
import Overview from './components/Setting/Overview';
import Postreview from './components/Postreview/Postreview';
import Review from './components/Review/Review';
import Reviews from './components/Reviews/Reviews';
import HotelDetail from './components/Hotels/HotelDetail';
import BankDetail from './components/Banks/BankDetail';
import RestaurentDetail from './components/Restaurent/RestaurentDetail';


const App = () => {
  return (
    <BrowserRouter>
     <ScrollToTop />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="navbar" element={<Navbar />} />
        <Route path="footer" element={<Footer />} />
        <Route path="/banks" element={<Bank />} />
        <Route path="/banks/:id" element={<BankDetail />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/restaurents" element={<Restaurent />} />
        <Route path="restaurents/:id" element={<RestaurentDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="next" element={<Next />} />
        <Route path="review" element={<Writereview />} />
        <Route path="next" element={<Detail />} />
        <Route path="java" element={<Java />} />
        <Route path="overview" element={<Overview />} />
        <Route path="profile" element={<EditProfile />} />
        <Route path="postreview/:id" element={<Postreview />} />
        <Route path="view" element={<Review />} />
        <Route path="Reviews" element={<Reviews />} />
       
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
