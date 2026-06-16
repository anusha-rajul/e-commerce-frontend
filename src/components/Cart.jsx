import { useContext } from "react"
import { ProductContextComponent } from "../context/ProductsContext"
import CartProductCard from "./CartProductCart"


const Cart = () => {
  const { cart } = useContext(ProductContextComponent)
  let total = 0;
  cart.map((cartProduct) => (
    total += cartProduct.price * cartProduct.quantity
  ))
  return (
    <>
      <div className="mt-5">
         {cart.length === 0 && (
        <div className="flex justify-center font-bold text-lg"><h1>Cart is Empty.</h1></div>
      )}
     </div>
      <h1 className="font-bold text-2xl mb-5 mx-5">Total: {total.toFixed(2)}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {cart.map((item, index) => {
          return <CartProductCard key={index} product={item} />
          })}
      
      </div>


      </>
  )
}

export default Cart
