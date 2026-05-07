import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useContext } from 'react'
import { ProductContextComponent } from '../context/ProductsContext'

const CartProductCart = ({ product }) => {
  const {removeProduct, setQuantity, quantity} = useContext(ProductContextComponent)
  return (
    <div className='border p-4 text-lg'>
          <img src={product.thumbnail} alt="thumbnail" />
          <h1 className='font-bold text-lg'>{product.title}</h1>
          <p>Price : ${product.price}</p>
          <p>Category : {product.category}</p>
       
      <p>{product.availabilityStatus}</p>
      <input type='number' value={quantity} onChange={(e) =>setQuantity(Number(e.target.value))} />
          
        <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
        Reviews
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          
                      {product.reviews?.map((review, index) => (
                      <MenuItem key={index}>
                          <p> * {review.comment}</p>
          </MenuItem>
         ))}
          
        </div>
      </MenuItems>
          </Menu>  
          
      <p>{product.warrantyInformation}</p>
      
          
      <button className='bg-yellow-500 py-1 px-2 rounded active:scale-95 cursor-pointer' onClick={()=>{removeProduct(product.id)}}>Remove</button>
    </div>
  )
}

export default CartProductCart
