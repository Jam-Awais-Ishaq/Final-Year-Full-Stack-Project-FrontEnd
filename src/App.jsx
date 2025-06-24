import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar1 from './ReuseableComponent/Navbar1';
import Mens from './Component/PeoplsProducts/Mens';
import Womens1 from './Component/PeoplsProducts/Womens1';
import ForgetPassword from './Component/Forms/ForgetPassword';
import Login1 from './Component/Forms/Login1';
import Register1 from './Component/Forms/Register1';
import NewPassword from './Component/Forms/NewPassword';
import Footer1 from './ReuseableComponent/Footer1';
import HomeComp from './Component/Pages/HomeComp';
import Kids from './Component/PeoplsProducts/Kids';
import ContactForm from './Component/Contact/ContactForm';
import AiFashion from './Component/Ai Recommender/AiFeshion';
import ProductCart from './ProductCart/ProductCart';
import Profile from './Profile/Profile';
import Receipt from './ReceiptFLD/Receipt';
import VerifyEmail from './Component/Forms/VerifyEmail';
import ProtectedRoute from './Component/Auth/ProtectedRoute';
import Chat from '../Chat/Chat';

function App() {

  return (
    <>
      <div className=''>
        <Router>
          <Navbar1 />
          <Routes>
            <Route path="/" element={<HomeComp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/login" element={<Login1 />} />
            <Route path="/register1" element={<Register1 />} />
            <Route path="/reset-password/:token" element={<NewPassword />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />

            {/* All protected routes below */}
            <Route path="/mens" element={<ProtectedRoute><Mens /></ProtectedRoute>} />
            <Route path="/womens" element={<ProtectedRoute><Womens1 /></ProtectedRoute>} />
            <Route path="/childrens" element={<ProtectedRoute><Kids /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><ContactForm /></ProtectedRoute>} />
            <Route path="/ai" element={<ProtectedRoute><AiFashion /></ProtectedRoute>} />
            <Route path="/productCart" element={<ProtectedRoute><ProductCart /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/receipt" element={<ProtectedRoute><Receipt /></ProtectedRoute>} />
          </Routes>
          <Footer1 />
        </Router>
      </div>
      <div className='fixed bottom-0 right-0 z-50'>
        <Chat />
      </div>
    </>
  );
}

export default App;