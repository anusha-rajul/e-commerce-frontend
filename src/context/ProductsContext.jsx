import { createContext, useState } from "react"
import { toast } from "react-toastify";
import { useEffect } from "react";


export const ProductContextComponent = createContext()

const ProductsContext = (props) => {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) ||[]
  })
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
 

  let index = (pageNumber - 1) * 10 + 4

  
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
      toast.error("Already added in cart")
      return 
    }
    setCart((prev) => [...prev, { ...filteredArray, quantity }]) 
    toast.success("Product added to cart.")

 
  }

  function removeProduct(id) {
    let updatedCart = cart.filter((prod) => {
      return prod.id !== id
    })
    toast.success("Product removed")
    setCart(updatedCart)
   
  }

  console.log(cart)

  let cartItems = cart.length;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart])

    
  function updateQuantity(id, quantity) {
    setCart(prev=>prev.map(item => item.id === id ? {...item, quantity}: item))
  }


  return (
 
          <ProductContextComponent.Provider value={{products, setProducts, cart, setCart, addToCart, setIndex, cartItems, removeProduct, isLoading, updateQuantity}}>
              {props.children}
        </ProductContextComponent.Provider>
    
  )
}

export default ProductsContext
