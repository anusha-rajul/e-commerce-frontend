import { useContext, useState } from 'react'
import { ProductContextComponent } from '../context/ProductsContext'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(ProductContextComponent)
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  return (
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
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
          >−</button>
          <span className='w-9 text-center text-sm font-medium text-zinc-900 border-x border-zinc-200 leading-8'>
            {quantity}
          </span>
          <button
            className='w-8 h-8 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-base flex items-center justify-center transition-colors'
            onClick={() => setQuantity(prev => prev + 1)}
          >+</button>
        </div>

        {/* Actions */}
        <div className='flex gap-2'>
          <button
            className='flex-1 h-[34px] text-[13px] font-medium border border-zinc-200 rounded-lg bg-transparent hover:bg-zinc-50 active:scale-[0.97] transition-all cursor-pointer'
            onClick={() => navigate(`/details/${product.id}`)}
          >
            Details
          </button>
          <button
            className='flex-1 h-[34px] text-[13px] font-medium bg-blue-700 text-blue-50 border border-blue-700 rounded-lg hover:bg-blue-800 active:scale-[0.97] transition-all cursor-pointer'
            onClick={() => addToCart(product.id, quantity)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard