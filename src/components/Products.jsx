import { useContext,  useMemo,  useState } from "react"
import ProductCard from "./ProductCard"
import { ProductContextComponent } from "../context/ProductsContext"
import useDebounce from "./useDebounce"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Products = () => {
  const { products, setIndex, isLoading } = useContext(ProductContextComponent)
  const [search, setSearch] = useState('')
  const [selection, setSelection] = useState('')
  const [price, setPrice] = useState('')
 
  
  
  let numbers = [1,2,3,4,5]

  const debouncedSearch = useDebounce(search, 300)
 

 
  let [min, max] = price ? price.split("-").map(Number) : [0, Infinity]

  let filteredProducts = useMemo(() => {
    return products.filter((product) => {
  
    return (product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      
      (selection === '' || product.category.toLowerCase() === selection) &&

      (price === '' || product.price >= min && product.price <= max)
      
  )
  })
  },[products, selection, price, debouncedSearch])

  let items = filteredProducts.length;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center my-10 gap-5 md:gap-10 ">
        <input value={search} type="text" placeholder="search" className="bg-gray-300 px-4 py-2 w-1/2 md:w-1/3 border rounded" onChange={(e) => setSearch(e.target.value)} />
        <select value={selection} onChange={(e) => setSelection(e.target.value)} className="border px-4 py-2 rounded">
          <option value="">All</option>
          <option value="beauty">Beauty</option>
          <option value="groceries">Groceries</option>
          <option value="fragrances">Fragrances</option>
        </select>
        <select value={price} onChange={(e) => setPrice(e.target.value)} className="px-4 py-2 border rounded">
          <option value="">All</option>
          <option value="1-50">$1-$50</option>
          <option value="51-100">$51-$100</option>
          <option value="101-150">$101-$150</option>
        </select>
      </div>


      {items === 0 ? <>
        <h1 className="flex justify-center items-center font-bold text-2xl">No product with that name</h1>
      </> : <>
     
          {isLoading ?
            
            <div className="grid grid-cols-4 gap-4">
              {Array(8).fill(0).map((_, index) => (
                <div key={index} className="p-4 border my-10 flex flex-col gap-10">
                  <Skeleton height={150} />
                  <Skeleton height={20} />
                  <Skeleton height={20} />
                  <Skeleton height={20} />
                  <Skeleton height={20} />
                  <Skeleton height={20} />
                </div>
              ))}
              
            </div>
            
          : <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => {
              return <ProductCard key={product.id} product={product} />
        })}
          </div>}
        
        
      </>}

      

      <div className="flex justify-center items-center gap-5 md:gap-20 m-10">
        {numbers.map((number) => {
          return <div key={number} className="bg-blue-600 p-4 cursor-pointer" onClick={() => setIndex(number)}>
            {number}
          </div>
        
        })}
      </div>
   
      </>
  )
}


export default Products
