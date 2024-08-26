import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import CmsList from './components/CmsList';


function App() {
  return (
    <div className="">

      {/* Navigation */}
      <BrowserRouter>

      {/* Navigation */}
        <Nav />

      {/* Routes */}
      <Routes>
        
        <Route element={<PrivateComponent />}>
          <Route path="/cms" element={<CmsList /> }/>
          {/* <Route path="/add-policy" render={(props) => <CmsForm {...props} isEditMode={false} />} />
          <Route path="/edit-policy/:type" render={(props) => <CmsForm {...props} isEditMode={true} />} /> */}
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={< UpdateProduct />} />
          {/* <Route path="/logout" element={<h1>Logout</h1>} /> */}
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
