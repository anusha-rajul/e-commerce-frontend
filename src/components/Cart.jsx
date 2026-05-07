import { useContext } from "react"
import { ProductContextComponent } from "../context/ProductsContext"
import CartProductCard from "./CartProductCart"


const Cart = () => {
  const { cart , quantity} = useContext(ProductContextComponent)
  let total = 0;
  cart.map((cartProduct) => (
    total += cartProduct.price * quantity
  ))
  return (
    <>
      <h1 className="font-bold text-2xl mb-5 mx-5">Total: {total.toFixed(2)}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {cart.map((item, index) => {
          return <CartProductCard key={index} product={item} />
          })}
      
      </div>


      </>
  )
}

export default Cart
