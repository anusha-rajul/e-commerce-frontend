import { useContext } from 'react'
import { ProductContextComponent } from '../context/ProductsContext'

const CartProductCart = ({ product }) => {
  const {removeProduct, updateQuantity} = useContext(ProductContextComponent)
  return (
    <div>
          <div className='bg-white border border-zinc-100 rounded-xl overflow-hidden hover:border-zinc-200 transition-colors w-[220px]'>
      
      {/* Image */}
      <div className='relative bg-zinc-100 h-[180px] flex items-center justify-center overflow-hidden rounded-lg'>
        <img
          className='w-full h-full object-cover'
          src={product.thumbnail}
          alt={product.title}
        />
      
      </div>

      {/* Body */}
      <div className='p-3.5'>
        <p className='text-sm font-medium text-zinc-900 truncate mb-1'>{product.title}</p>

        <p className='text-lg font-medium text-zinc-900 mb-3.5'>
          ${product.price}
          {product.discountPercentage && (
            <span className='text-xs text-zinc-400 font-normal line-through ml-1.5'>
              ${Math.round(product.price / (1 - product.discountPercentage / 100))}
            </span>
          )}
        </p>

        {/* Quantity */}
        <div className='flex items-center border border-zinc-200 rounded-lg w-fit overflow-hidden mb-3'>
          <button
            className='w-8 h-8 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-base flex items-center justify-center transition-colors'
            onClick={() => updateQuantity(product.id, Math.max(1, product.quantity - 1))}
          >−</button>
          <span className='w-9 text-center text-sm font-medium text-zinc-900 border-x border-zinc-200 leading-8'>
            {product.quantity}
          </span>
          <button
            className='w-8 h-8 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-base flex items-center justify-center transition-colors'
            onClick={() => updateQuantity(product.id, product.quantity + 1)}
          >+</button>
          </div>
                <button className='bg-[#26292b] text-white py-1 px-2 rounded active:scale-95 cursor-pointer' onClick={()=>{removeProduct(product.id)}}>Remove</button>

      </div>
    </div>
          
    </div>
  )
}

export default CartProductCart
