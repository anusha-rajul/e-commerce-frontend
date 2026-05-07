
import { Link } from 'react-router-dom'
import cartIcon from '../images/shopping-cart.png'
import { useContext } from 'react'
import { ProductContextComponent } from '../context/ProductsContext'

const Navbar = () => {
  const {cartItems} = useContext(ProductContextComponent)
  return (
      <div className='flex justify-between px-10 py-5 bg-blue-300 mb-5'>
      <Link to='/'><h1 className='text-lg font-bold'>Shopping</h1></Link>
      
      <div>
        
   
      </div>
     
      <div ><Link to='/cart'><img className='relative' src={cartIcon} alt="cart" /> <span className='absolute top-0 right-12 font-bold'>{cartItems}</span></Link></div>
    </div>
  )
}

export default Navbar
