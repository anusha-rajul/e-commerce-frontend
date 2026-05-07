import { createContext, useState } from "react"

import { useEffect } from "react";


export const ProductContextComponent = createContext()

const ProductsContext = (props) => {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) ||[]
  })
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  let index = (pageNumber - 1) * 10

  
  function setIndex(num) {
    setPageNumber(num)
  }

  

 

    useEffect(() => {
          const getData = async() => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${index}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        setProducts(data.products)
      
      } catch (error) {
        console.error(error)
      }
      finally {
        setIsLoading(false)
      }
       
      }
      getData()
    }, [pageNumber])
  
  function addToCart(id, quantity) {
    let filteredArray = products.find((prod) => prod.id === id)
    if (cart.some((item)=> item.id === id)) {
      alert("Already added in cart")
      return 
    }
    setCart((prev) => [...prev, {...filteredArray, quantity}]) 

 
  }

  function removeProduct(id) {
    let updatedCart = cart.filter((prod) => {
      return prod.id !== id
    })
    setCart(updatedCart)
   
  }

  console.log(cart)

  let cartItems = cart.length;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart])

    


  return (
 
          <ProductContextComponent.Provider value={{products, setProducts, cart, setCart, addToCart, setIndex, cartItems, removeProduct, isLoading, quantity, setQuantity}}>
              {props.children}
        </ProductContextComponent.Provider>
    
  )
}

export default ProductsContext
