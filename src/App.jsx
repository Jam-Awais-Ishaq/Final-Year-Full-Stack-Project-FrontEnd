import './App.css';
import Navbar from './ReuseableComponent/Navbar';
import Footer1 from './ReuseableComponent/Footer1';
import Mens from './Component/Mens';
import Womens1 from './Component/Womens1';
import HomeComp from './Component/HomeComp';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ForgetPassword from './Component/Forms/ForgetPassword';
import NewPassword from './Component/Forms/NewPassword';
import Login1 from './Component/Forms/Login1';
import Loops from './Component/Loops';
import Register1 from './Component/Forms/Register1';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens1" element={<Womens1 />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/login" element={<Login1 />} />
          <Route path='/register1' element={<Register1/>}></Route>
          <Route path="/new-password" element={<NewPassword />} />
        </Routes>
        <Footer1 />
      </Router>
      {/* <Register1/> */}
    </>
  );
}
export default App;