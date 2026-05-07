import Products from "./components/Products"
import Navbar from "./components/Navbar"
import Cart from "./components/Cart"
import { Routes, Route } from "react-router-dom"
import DetailsPage from "./components/DetailsPage"



const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
       
    </div>
  )
}

export default App
