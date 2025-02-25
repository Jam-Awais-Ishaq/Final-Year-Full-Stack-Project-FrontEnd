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
function App() {
  return (
    <>
      <Router>
        <Navbar1 />
        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens1 />} />
          <Route path='/childrens' element={<Kids/>}/>
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/login" element={<Login1 />} />
          <Route path='/register1' element={<Register1 />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/contact" element={<ContactForm/>}/>
          <Route path="/ai" element={<AiFashion/>}/>
        </Routes>
        <Footer1 />
      </Router>
    </>
  );
}
export default App;