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
import Mariot from './components/Hotels/Mariot';
import Serena from './components/Hotels/Serena';
import Radison from './components/Hotels/Radison';
import GrandLegacy from './components/Hotels/GrandLegacy';
import ScrollToTop from './components/ScrolllToTop/ScrollToTop';
import Java from './components/Restaurent/Java';
import EditProfile from './components/Setting/EditProfile';
import Overview from './components/Setting/Overview';
import Postreview from './components/Postreview/Postreview';
import Review from './components/Review/Review';
import Medical from './components/Setting/Medical';


const App = () => {
  return (
    <BrowserRouter>
     <ScrollToTop />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="navbar" element={<Navbar />} />
        <Route path="footer" element={<Footer />} />
        <Route path="bank" element={<Bank />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="restaurent" element={<Restaurent />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="next" element={<Next />} />
        <Route path="review" element={<Writereview />} />
        <Route path="next" element={<Detail />} />
        <Route path="mariot" element={<Mariot />} />
        <Route path="serena" element={<Serena />} />
        <Route path="radison" element={<Radison />} />
        <Route path="legacy" element={<GrandLegacy />} />
        <Route path="java" element={<Java />} />
        <Route path="overview" element={<Overview />} />
        <Route path="profile" element={<EditProfile />} />
        <Route path="postreview" element={<Postreview />} />
        <Route path="view" element={<Review />} />
        <Route path="medi" element={<Medical />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
