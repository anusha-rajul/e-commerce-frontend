import Products from "./components/Products"
import Navbar from "./components/Navbar"
import Cart from "./components/Cart"
import { Routes, Route } from "react-router-dom"
import DetailsPage from "./components/DetailsPage"
import { ToastContainer } from "react-toastify"
import Home from "./components/Home"



const App = () => {

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
       
    </div>
  )
}

export default App
