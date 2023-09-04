import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/NavBar';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import Register from "./components/Auth/Register";
import NotFound from './components/NotFound';
import Login from './components/Auth/Login';
import CheckoutSuccess from './components/Cart/CheckoutSuccess';
import Dashboard from './components/Admin/Dashboard';
import Products from './components/Admin/Products';
import Summary from './components/Admin/Summary';
import CreateProduct from './components/Admin/CreateProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <main className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Dashboard />}>
              <Route path="products" element={<Products/>}>
                <Route path='create-product' element={< CreateProduct/>}/>
              </Route> 
              <Route path="summary" element={<Summary />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
