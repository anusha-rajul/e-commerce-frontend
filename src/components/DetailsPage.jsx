import { useContext } from "react"
import { useParams } from "react-router-dom"
import { ProductContextComponent } from "../context/ProductsContext"


const DetailsPage = () => {
    const { id } = useParams()
    const NumberId = Number(id)
  const { products } = useContext(ProductContextComponent)

  if (products.length === 0) {
    return <h1>Loading...</h1>
  }
    const product = products.find((item) => item.id === NumberId)
  
  return (
    <div>
          {product ? <div className="grid grid-cols-1 md:grid-cols-3 p-4 md:p-0" >
         
        <div>
          <img src={product.images[0]} alt='images' className="h-100" />
          </div>
        <div className="flex flex-col gap-2 text-lg">
          <p className="font-bold text-2xl md:col-span-2">{product.title}</p>
              <p>{product.description}</p>
              <p>Brand : {product.brand}</p>
        <p>Rating: {product.rating}</p>
        <p>{product.warrantyInformation}</p>
         <p>Availability: <span className="underline underline-offset-2" >{product.availabilityStatus}</span></p>
              <p className="font-bold text-2xl">Reviews : </p>
              {product.reviews.map((review) => <p>comments :   {review.comment} <p> rating :   {review.rating}</p> <p>reviewerName :   {review.reviewerName}</p></p>)}
              <p className="underline underline-offset-2">{product.returnPolicy}</p>

          </div>
              </div>
          :
             <h1>No product</h1>
          }
    </div>
  )
}

export default DetailsPage
