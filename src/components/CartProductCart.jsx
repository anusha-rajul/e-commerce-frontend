import { useContext } from 'react'
import { ProductContextComponent } from '../context/ProductsContext'

const CartProductCart = ({ product }) => {
  const {removeProduct, setQuantity, quantity} = useContext(ProductContextComponent)
  return (
    <div className='bg-white border border-white shadow-lg rounded-md p-4 text-lg'>
          <img className='h-[200px]' src={product.thumbnail} alt="thumbnail" />
          <h1 className='font-bold text-lg'>{product.title}</h1>
          <p>Price : ${product.price}</p>
     
      <p>{product.availabilityStatus}</p>
      <p>Quantity : </p>
      <input type='number' value={quantity} onChange={(e) =>setQuantity(Number(e.target.value))} />
     
          
      <p>{product.warrantyInformation}</p>
      
          
      <button className='bg-[#26292b] text-white py-1 px-2 rounded active:scale-95 cursor-pointer' onClick={()=>{removeProduct(product.id)}}>Remove</button>
    </div>
  )
}

export default CartProductCart
